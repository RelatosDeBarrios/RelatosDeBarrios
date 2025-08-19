'use client'

import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { SendEmailAction } from '../types/action'
import { ClientFormValues, FIELD_IDS } from '../schemas/formSchema'
import { validateIp } from '../utils/validateIp'
import { uploadBlobs } from '../utils/uploadBlobs'
import { toDomain } from '../utils/toDomain'
import { validateFileConstraints } from '../utils/fileConstraints'
import { ContactErrors } from '../content/errors'
import { formatDuration } from '@/utils/format'

// API endpoints
const VALIDATE_IP_URL = '/api/validate-ip'
const BLOB_UPLOAD_URL = '/api/blob-upload'

type Phase =
  | 'idle'
  | 'validating'
  | 'uploading'
  | 'submitting'
  | 'success'
  | 'error'

interface UseContactSubmitProps {
  action: SendEmailAction
  setError: UseFormSetError<ClientFormValues>
}

export const useContactSubmit = ({
  action,
  setError,
}: UseContactSubmitProps) => {
  const [phase, setPhase] = useState<Phase>('idle')
  // Keep track of correlation ID for tracing the request
  const [correlationId, setCorrelationId] = useState<string | undefined>(
    undefined
  )

  const onSubmit = async (values: ClientFormValues) => {
    try {
      // Validate client-side (handled by RHF with Zod resolver)
      setPhase('validating')

      // Validate file constraints before proceeding to server validation
      const files = values[FIELD_IDS.attachments] || []
      if (files.length > 0) {
        const fileValidation = validateFileConstraints(files as File[])

        if (!fileValidation.valid) {
          setPhase('error')

          // Set specific file-related errors
          Object.entries(fileValidation.errors).forEach(([, errorMessage]) => {
            // For file-specific errors, set them on the attachments field
            setError(FIELD_IDS.attachments, {
              message: errorMessage,
            })
          })

          // Set a general submission error too
          setError('form_submit', {
            message: ContactErrors.UploadFailed,
          })
          return
        }
      }

      // Validate IP address
      const ipValidation = await validateIp(VALIDATE_IP_URL)

      // Store correlation ID for request tracing
      if (ipValidation.correlationId) {
        setCorrelationId(ipValidation.correlationId)
      }

      if (!ipValidation.allowed) {
        setPhase('error')
        const retryAfter = ipValidation.retryAfter
        const message = retryAfter
          ? `${ContactErrors.UploadRateLimited} ${ContactErrors.RetryAfterTemplate.replace('{seconds}', formatDuration({ seconds: Number(retryAfter) }))}`
          : ipValidation.message || ContactErrors.UploadClientError
        setError('form_submit', { message })
        return
      }

      // Convert once to domain model – tight types, no unions
      const {
        form_name,
        form_email,
        form_commentary,
        form_contribution,
        form_attachments,
      } = toDomain(values)

      // Upload files if any
      let attachmentsBlobs: string[] = []
      if (form_attachments.length > 0) {
        setPhase('uploading')

        const uploadResult = await uploadBlobs(
          form_attachments as File[],
          BLOB_UPLOAD_URL,
          ipValidation.correlationId || undefined
        )

        // Update correlation ID if returned
        if (uploadResult.correlationId) {
          setCorrelationId(uploadResult.correlationId)
        }

        if (!uploadResult.success) {
          setPhase('error')
          setError('form_submit', {
            message: uploadResult.message || 'File upload failed.',
          })
          return
        }

        attachmentsBlobs = uploadResult.paths
      }

      // Submit to server
      setPhase('submitting')

      // Build FormData explicitly (no Object.entries widening)
      const formData = new FormData()
      formData.append(FIELD_IDS.name, form_name)
      formData.append(FIELD_IDS.email, form_email)
      formData.append(FIELD_IDS.commentary, form_commentary)
      if (form_contribution)
        formData.append(FIELD_IDS.contribution, form_contribution)

      // Send blob URLs instead of raw files (files are already uploaded to Vercel Blob)
      // Server will receive URLs it can use to download files as needed
      for (const url of attachmentsBlobs) {
        formData.append(FIELD_IDS.attachments, url)
      }

      // Add correlation ID if available for server-side tracking
      if (correlationId) {
        formData.append('correlationId', correlationId)
      }

      const result = await action(
        { success: true, error: null, message: '' },
        formData
      )

      if (!result.success) {
        setPhase('error')

        // If we have specific field errors, display them on the appropriate fields
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof ClientFormValues, {
              message: Array.isArray(messages)
                ? messages.join('. ')
                : String(messages),
            })
          })
        }

        // Set the general form error
        setError('form_submit', {
          message: result.message || 'Submission failed.',
        })

        // Store correlation ID from response if provided (for error reporting)
        if (result.correlationId) {
          setCorrelationId(result.correlationId)
        }

        return
      }

      // On success
      setPhase('success')

      // We're NOT resetting the form on success per requirements
      // User must manually reload the page to submit another form
    } catch (error: unknown) {
      setPhase('error')

      // Handle the error more robustly
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred'

      // Set a general form error
      setError('form_submit', { message: errorMessage })
    }
  }

  return {
    onSubmit,
    phase,
    correlationId,
  }
}
