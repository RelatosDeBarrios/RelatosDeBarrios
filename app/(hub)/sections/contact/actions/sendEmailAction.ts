'use server'

import { BRAND } from '@/content/brand'
import { Attachment, Resend } from 'resend'
import { SendEmailAction } from '../types/action'
import { EmailTemplate } from '../components/EmailTemplate'
import { ServerFormSchema, FIELD_IDS } from '../schemas/formSchema'
import { ProjectsId } from '@/types/core'
import { createCorrelationId } from '@/app/(hub)/lib/crypto'
import { ContactErrors } from '../content/errors'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail: SendEmailAction = async (_, formData) => {
  // Extract or create a correlation ID for request tracing
  const correlationId = await createCorrelationId(
    (formData.get('correlationId') as string) || undefined
  )

  try {
    const form = {
      [FIELD_IDS.name]: formData.get(FIELD_IDS.name),
      [FIELD_IDS.email]: formData.get(FIELD_IDS.email),
      [FIELD_IDS.commentary]: formData.get(FIELD_IDS.commentary),
      [FIELD_IDS.contribution]: formData.get(FIELD_IDS.contribution),
      [FIELD_IDS.attachments]: formData.getAll(FIELD_IDS.attachments),
    }

    console.log(`Processing form submission`, { correlationId })

    const validation = ServerFormSchema.safeParse(form)

    if (!validation.success) {
      console.error('Form validation failed', {
        correlationId,
        error: validation.error,
      })

      return {
        success: false,
        error: null,
        message: ContactErrors.ValidationFailed,
        correlationId,
      }
    }

    const {
      [FIELD_IDS.name]: name,
      [FIELD_IDS.email]: email,
      [FIELD_IDS.commentary]: commentary,
      [FIELD_IDS.contribution]: contribution,
      [FIELD_IDS.attachments]: attachments,
    } = validation.data

    // Handle the contribution case with a default label when undefined/not selected
    const projectContribution = contribution
      ? BRAND.projects[contribution as ProjectsId]
      : 'Sin material para aportar'

    // Process attachments (which are blob URLs) if they exist
    const attachmentUrls: Attachment[] = []
    const haveAttachments =
      attachments && attachments.length > 0 && Array.isArray(attachments)

    if (haveAttachments) {
      try {
        // Validate that all URLs have the expected Vercel Blob domain and are https without credentials/fragments
        const attachmentBlobs = attachments.filter((url) => {
          try {
            const u = new URL(url)
            const isHttps = u.protocol === 'https:'
            const noCreds = !u.username && !u.password
            const noFragment = !u.hash
            const allowedHost = u.hostname.includes('blob.vercel-storage.com')
            return isHttps && noCreds && noFragment && allowedHost
          } catch {
            return false
          }
        })

        // generate attachment URLs for Resend
        attachmentBlobs.forEach((url) => {
          attachmentUrls.push({
            path: url,
            filename: url.split('/').pop() || 'attachment',
          })
        })
      } catch (error) {
        console.error('Error processing attachments', { correlationId, error })

        // Attempt to clean up any uploaded blobs before failing
        if (attachments.length > 0) {
          await cleanupAttachments(attachments, correlationId)
        }

        return {
          success: false,
          error: null,
          message: ContactErrors.UploadFailed,
          correlationId,
        }
      }
    }

    try {
      const { error } = await resend.emails.send({
        from: `Relatos de Barrios <web@contacto.relatosdebarrios.cl>`,
        replyTo: String(email),
        to: ['strocsdev@gmail.com'],
        subject: `Contacto desde el sitio web - ${String(name)}`,
        text: `${String(name)} (${String(email)}) envió: ${String(commentary)}`,
        react: EmailTemplate({
          name: String(name),
          commentary: String(commentary),
          contribution: projectContribution,
        }),
        attachments: attachmentUrls,
      })

      if (error) {
        console.error('Email sending error', { correlationId, error })

        // Attempt to clean up any uploaded blobs before failing
        if (haveAttachments) {
          await cleanupAttachments(attachments, correlationId)
        }

        return {
          success: false,
          error: null,
          message: ContactErrors.SendFailed,
          correlationId,
        }
      }

      console.log('Email sent successfully', { correlationId })
      return {
        success: true,
        error: null,
        message: ContactErrors.SendSuccess,
        correlationId,
      }
    } catch (error) {
      console.error('Unexpected error sending email', { correlationId, error })

      // Attempt to clean up any uploaded blobs before failing
      if (haveAttachments) {
        await cleanupAttachments(attachments, correlationId)
      }

      return {
        success: false,
        error: null,
        message: ContactErrors.SendFailed,
        correlationId,
      }
    }
  } catch (error) {
    console.error('Unexpected error in sendEmail action', {
      correlationId,
      error,
    })

    return {
      success: false,
      error: null,
      message: ContactErrors.Unexpected,
      correlationId,
    }
  }
}

/**
 * Attempts to clean up attachment blobs if email sending fails
 */
async function cleanupAttachments(urls: string[], correlationId?: string) {
  try {
    // Call our cleanup API route
    const response = await fetch(
      `${process.env.SITE_URL || ''}/api/cleanup-blobs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': String(
            process.env.INTERNAL_CLEANUP_SECRET || ''
          ),
          'X-Correlation-Id': correlationId || '',
        },
        body: JSON.stringify({
          urls: urls.filter((url) => url.includes('blob.vercel-storage.com')),
          correlationId,
        }),
      }
    )

    if (!response.ok) {
      console.error('Failed to clean up attachments', {
        correlationId,
        status: response.status,
      })
    } else {
      const result = await response.json()
      console.log(
        `Cleaned up ${result.deleted} of ${result.total} attachments`,
        {
          correlationId,
        }
      )
    }
  } catch (error) {
    console.error('Error during attachment cleanup', { correlationId, error })
  }
}
