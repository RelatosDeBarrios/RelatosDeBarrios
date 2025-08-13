'use server'
import { BRAND } from '@/content/brand'
import { Resend } from 'resend'
import { CONTACT } from '../content'
import { SendEmailAction } from '../types/action'
import { EmailTemplate } from '../components/EmailTemplate'
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
    form_name: formData.get(nameId),
    form_email: formData.get(emailId),
    form_commentary: formData.get(commentaryId),
    form_contribution: formData.get(contributionId),
    form_attachments: formData.getAll(attachmentsId),
  }

  const validation = FormSchema.safeParse(form)

  if (!validation.success)
    return {
      success: false,
      error: validation.error,
    }

  const {
    form_name: name,
    form_email: email,
    form_commentary: commentary,
    form_contribution: contribution,
    form_attachments: attachments,
  } = validation.data

  const projectContribution = !!contribution && BRAND.projects[contribution]

  let resendAttachments: { content: string; filename: string }[] = []

  if (!!attachments && attachments.length > 0) {
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
      return { success: false, error, message: 'Error fetching blob URLs' }
    }
  }

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
      return { success: false, error, message: 'Error sending email' }
    }

    return { success: true, error: null, message: 'Email sent successfully' }
  } catch (error) {
    return { success: false, error, message: 'Error sending email' }
  }
}
