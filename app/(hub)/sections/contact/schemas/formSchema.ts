import { z } from 'zod'
import { CONTACT } from '../content'

const {
  name: { requiredMessage: nameRequiredMsg },
  email: { requiredMessage: emailRequiredMsg, invalidMessage: emailInvalidMsg },
  commentary: { requiredMessage: commentaryRequiredMsg },
} = CONTACT.form

export const FormSchema = z.object({
  form_name: z
    .string({ message: nameRequiredMsg })
    .trim()
    .min(3, 'Debe contener más de 2 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  form_email: z.email(emailInvalidMsg).trim().min(1, emailRequiredMsg),
  form_commentary: z.string().trim().min(1, commentaryRequiredMsg),
  form_contribution: z
    .union([z.literal(''), z.enum(['rengifo', 'covico'])])
    .transform((v) => (v === '' ? undefined : v))
    .optional(),
  form_attachments: z
    .array(
      z.object({
        blob: z.string(),
        filename: z.string(),
      })
    )
    .optional(),
})

export type ContactForm = z.infer<typeof FormSchema>
