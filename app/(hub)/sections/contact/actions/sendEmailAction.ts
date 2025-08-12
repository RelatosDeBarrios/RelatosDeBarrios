'use server'
import { BRAND } from '@/content/brand'
import { Resend } from 'resend'
import { CONTACT } from '../content'
import { SendEmailAction } from '../types/action'
import { EmailTemplate } from '../components/EmailTemplate'
import z from 'zod'
import { FormSchema } from '../schemas/formSchema'

const resend = new Resend(process.env.RESEND_API_KEY)

const {
  name: { id: nameId },
  email: { id: emailId },
  commentary: { id: commentaryId },
  contribution: { id: contributionId },
  attachments: { id: attachmentsId },
} = CONTACT.form

export const sendEmail: SendEmailAction = async (_, formData) => {
  const form = {
    name: formData.get(nameId),
    email: formData.get(emailId),
    commentary: formData.get(commentaryId),
    contribution: formData.get(contributionId),
    attachments: formData.getAll(attachmentsId),
  }

  // Data Validation
  const validation = z.safeParse(FormSchema, form)

  if (validation.success === false)
    return {
      ok: false,
      error: validation.error,
    }

  const { name, email, commentary, contribution, attachments } = validation.data

  const projectContribution = !!contribution && BRAND.projects[contribution]

  // Prepare attachments - could be from File objects or from Blob URLs
  let resendAttachments: { content: string; filename: string }[] = []

  if (!!attachments && attachments.length > 0) {
    // If we have blob URLs, fetch them and use as attachments
    try {
      resendAttachments = await Promise.all(
        attachments.map(async ({ blob, filename }) => {
          const response = await fetch(blob)
          const arrayBuffer = await response.arrayBuffer()
          const content = Buffer.from(arrayBuffer).toString('base64')

          return { content, filename }
        })
      )
    } catch (error) {
      return { ok: false, error, message: 'Error fetching blob URLs' }
    }
  }
  // Send email
  try {
    const { error } = await resend.emails.send({
      from: `${name} <web@contacto.relatosdebarrios.cl>`,
      replyTo: email,
      to: ['strocsdev@gmail.com'],
      subject: 'Contacto desde el sitio web de ' + name,
      text: commentary,
      attachments: resendAttachments,
      react: EmailTemplate({
        name: name,
        commentary: commentary,
        contribution: projectContribution,
      }),
    })

    if (error) {
      return { ok: false, error, message: 'Error sending email' }
    }

    return { ok: true, error: null, message: 'Email sent successfully' }
  } catch (error) {
    return { ok: false, error, message: 'Error sending email' }
  }
}
