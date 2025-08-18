'use server'
import { BRAND } from '@/content/brand'
import { Resend } from 'resend'
import { SendEmailAction } from '../types/action'
import { EmailTemplate } from '../components/EmailTemplate'
import { FormSchema, FIELD_IDS } from '../schemas/formSchema'
import { ProjectsId } from '@/types/core'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail: SendEmailAction = async (_, formData) => {
  const form = {
    [FIELD_IDS.name]: formData.get(FIELD_IDS.name),
    [FIELD_IDS.email]: formData.get(FIELD_IDS.email),
    [FIELD_IDS.commentary]: formData.get(FIELD_IDS.commentary),
    [FIELD_IDS.contribution]: formData.get(FIELD_IDS.contribution),
    [FIELD_IDS.attachments]: formData.getAll(FIELD_IDS.attachments),
  }

  const validation = FormSchema.safeParse(form)

  if (!validation.success)
    return {
      success: false,
      error: validation.error,
    }

  const {
    [FIELD_IDS.name]: name,
    [FIELD_IDS.email]: email,
    [FIELD_IDS.commentary]: commentary,
    [FIELD_IDS.contribution]: contribution,
    [FIELD_IDS.attachments]: attachments,
  } = validation.data

  // Safely cast the contribution to ProjectsId
  const projectContribution =
    contribution && BRAND.projects[contribution as ProjectsId]

  let resendAttachments: { content: string; filename: string }[] = []

  // Process attachments if they exist
  if (attachments && Array.isArray(attachments) && attachments.length > 0) {
    try {
      resendAttachments = await Promise.all(
        attachments.map(async (file: File) => {
          // For actual File objects from FormData
          const arrayBuffer = await file.arrayBuffer()
          const content = Buffer.from(arrayBuffer).toString('base64')

          return {
            content,
            filename: file.name,
          }
        })
      )
    } catch (error) {
      return { success: false, error, message: 'Error processing attachments' }
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: `${String(name)} <web@contacto.relatosdebarrios.cl>`,
      replyTo: String(email),
      to: ['strocsdev@gmail.com'],
      subject: 'Contacto desde el sitio web de ' + String(name),
      text: String(commentary),
      attachments: resendAttachments,
      react: EmailTemplate({
        name: String(name),
        commentary: String(commentary),
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
