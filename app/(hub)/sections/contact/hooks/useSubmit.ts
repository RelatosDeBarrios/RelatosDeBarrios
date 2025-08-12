import { useState } from 'react'
import { uploadToVercelBlob } from '../utils/blobUpload'
import { validateForm, ValidationResult } from '../utils/formValidation'
import { PutBlobResult } from '@vercel/blob/client'
import { DropzoneFile } from '../types/attachments'

// API route paths
const BLOB_UPLOAD_URL = '/api/blob-upload'
const VALIDATE_IP_URL = '/api/validate-ip'

/**
 * Custom hook to handle the form submission process with:
 * 1. IP validation
 * 2. File uploads to Vercel Blob
 * 3. Preparation for server action
 */
export const useSubmit = () => {
  // State for managing the submission process
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [blobResults, setBlobResults] = useState<PutBlobResult[]>([])
  const [validationErrors, setValidationErrors] =
    useState<ValidationResult | null>(null)
  const [ipValidationResult, setIpValidationResult] = useState<{
    allowed: boolean
    remaining: number
    retryAfter?: number
    error?: string
  } | null>(null)

  /**
   * First step: Validate IP address with rate limiting
   * Must be called before attempting to upload files
   */
  const validateIp = async (): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(VALIDATE_IP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      setIpValidationResult(result)

      if (!result.allowed) {
        const errorMsg =
          result.error ||
          `Rate limit exceeded. You have ${result.remaining} uploads remaining.` +
            (result.retryAfter
              ? ` Please try again in ${Math.ceil(result.retryAfter / 60)} minutes.`
              : '')

        setError(errorMsg)
        setLoading(false)
        return false
      }

      return true
    } catch (err) {
      console.error('IP validation error:', err)
      setError('Error validating your request. Please try again later.')
      setLoading(false)
      return false
    }
  }

  /**
   * Second step: Upload files to Vercel Blob
   * Only called if IP validation succeeds
   */
  const uploadFiles = async (files: File[]): Promise<PutBlobResult[]> => {
    if (files.length === 0) {
      // No files to upload
      return []
    }

    try {
      setUploadProgress(0)

      // Upload files one by one to track progress
      const results: PutBlobResult[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const result = await uploadToVercelBlob(file, BLOB_UPLOAD_URL)
        results.push(result)

        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setBlobResults(results)
      return results
    } catch (err) {
      console.error('File upload error:', err)
      setError('Error uploading files. Please try again.')
      throw err
    }
  }

  /**
   * Main handler that orchestrates the sequential submission flow
   * 1. Validate form and attachments
   * 2. Validate IP if form is valid
   * 3. Upload files if IP check passes
   * 4. Prepare formData for server action
   */
  const prepareSubmission = async (
    originalFormData: FormData,
    dropzoneFiles: DropzoneFile[]
  ): Promise<{ formData: FormData; canProceed: boolean }> => {
    // Create a new FormData object to avoid mutation issues
    const preparedFormData = new FormData()

    try {
      setLoading(true)
      setValidationErrors(null)

      // Step 1: Validate form and attachments
      const validationResult = validateForm(originalFormData, dropzoneFiles)

      if (!validationResult.success) {
        setValidationErrors(validationResult)
        setLoading(false)

        // Set main error message for display
        if (validationResult.message) {
          setError(validationResult.message)
        } else if (validationResult.errors) {
          // Combine all error messages
          const errorMessages = Object.values(validationResult.errors).flat()
          if (errorMessages.length > 0) {
            setError(errorMessages[0])
          }
        }

        return { formData: preparedFormData, canProceed: false }
      }

      // Step 2: Validate IP
      const ipValid = await validateIp()
      if (!ipValid) {
        return { formData: preparedFormData, canProceed: false }
      }

      // Step 3: Upload files if any
      let blobUrls: string[] = []
      if (dropzoneFiles && dropzoneFiles.length > 0) {
        const rawFiles = dropzoneFiles.map((df) => df.file)
        const uploadResults = await uploadFiles(rawFiles)
        blobUrls = uploadResults.map((r) => r.url)
      }

      // Step 4: Copy all original form data to the prepared form data
      for (const [key, value] of originalFormData.entries()) {
        // Skip file inputs - we'll handle them via blob URLs
        if (!(value instanceof File)) {
          preparedFormData.append(key, value)
        }
      }

      // Step 5: Add blob URLs to the prepared formData
      if (blobUrls.length > 0) {
        preparedFormData.append('blobUrls', JSON.stringify(blobUrls))
      }

      return {
        formData: preparedFormData,
        canProceed: true,
      }
    } catch (error) {
      console.error('Error in submission preparation:', error)
      setLoading(false)
      setError('Error inesperado al preparar el envío. Inténtalo de nuevo.')
      return {
        formData: preparedFormData,
        canProceed: false,
      }
    }
  }

  /**
   * Resets all state related to submission
   */
  const resetState = () => {
    setLoading(false)
    setError(null)
    setUploadProgress(0)
    setBlobResults([])
    setIpValidationResult(null)
    setValidationErrors(null)
  }

  return {
    prepareSubmission,
    validateIp,
    uploadFiles,
    resetState,
    loading,
    error,
    uploadProgress,
    blobResults,
    ipValidationResult,
    validationErrors,
  }
}
