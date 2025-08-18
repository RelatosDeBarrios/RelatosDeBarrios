import { z } from 'zod'
import { CONTACT } from '../content'

const {
  name: { requiredMessage: nameRequiredMsg },
  email: { requiredMessage: emailRequiredMsg, invalidMessage: emailInvalidMsg },
  commentary: { requiredMessage: commentaryRequiredMsg },
} = CONTACT.form

// Define field IDs for consistent access
export const FIELD_IDS = {
  name: CONTACT.form.name.id,
  email: CONTACT.form.email.id,
  commentary: CONTACT.form.commentary.id,
  contribution: CONTACT.form.contribution.id,
  attachments: CONTACT.form.attachments.id,
} as const

// Form schema for both client and server validation
export const FormSchema = z.object({
  [FIELD_IDS.name]: z
    .string({ message: nameRequiredMsg })
    .trim()
    .min(3, 'Debe contener más de 2 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  [FIELD_IDS.email]: z.email(emailInvalidMsg).trim().min(1, emailRequiredMsg),
  [FIELD_IDS.commentary]: z.string().trim().min(1, commentaryRequiredMsg),
  [FIELD_IDS.contribution]: z
    .union([z.literal(''), z.enum(['rengifo', 'covico'] as const)])
    .optional(),
  [FIELD_IDS.attachments]: z.array(z.instanceof(File)).optional().nullable(),
})

// Infer the form values type from our schema
export type FormValues = z.infer<typeof FormSchema>

// Keep the existing ContactForm type for content structure
export type ContactFormSchema = FormValues
