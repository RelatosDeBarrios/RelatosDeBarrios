import z from 'zod'
import { CONTACT } from '../content'

const {
  name: { requiredMessage: nameRequiredMsg },
  email: { requiredMessage: emailRequiredMsg, invalidMessage: emailInvalidMsg },
  commentary: { requiredMessage: commentaryRequiredMsg },
} = CONTACT.form

export const FormSchema = z.object({
  name: z
    .string({ error: nameRequiredMsg })
    .trim()
    .min(2, 'Debe contener más de 2 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  email: z
    .email({
      error: (iss) => {
        if (iss.code === 'invalid_type') return emailRequiredMsg
        if (iss.code === 'invalid_format') return emailInvalidMsg
      },
    })
    .trim(),
  commentary: z.string({ error: commentaryRequiredMsg }).trim(),
  contribution: z.enum(['rengifo', 'covico']),
  attachments: z
    .array(
      z.object({
        blob: z.string(),
        filename: z.string(),
      })
    )
    .optional(),
})

export type FormSchemaType = z.infer<typeof FormSchema>
