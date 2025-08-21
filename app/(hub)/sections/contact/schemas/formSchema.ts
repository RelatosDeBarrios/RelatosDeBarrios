import { z } from 'zod'
import { CONTACT } from '../content'
import { formErrors } from '../content/errors'

// Define field IDs for consistent access
export const FIELD_IDS = {
  name: CONTACT.form.name.id,
  email: CONTACT.form.email.id,
  commentary: CONTACT.form.commentary.id,
  contribution: CONTACT.form.contribution.id,
  attachments: CONTACT.form.attachments.id,
} as const

/**
 * Base schema with common validation rules for all fields except attachments
 * This is used as the foundation for both client and server schemas
 */
export const BaseFormSchema = {
  [FIELD_IDS.name]: z
    .string({ message: formErrors.NameRequired })
    .trim()
    .min(3, formErrors.NameTooShort)
    .max(100, formErrors.NameTooLong),
  [FIELD_IDS.email]: z
    .email(formErrors.EmailInvalid)
    .trim()
    .min(1, formErrors.EmailRequired),
  [FIELD_IDS.commentary]: z
    .string()
    .trim()
    .min(1, formErrors.CommentaryRequired)
    .max(3000, formErrors.CommentaryTooLong),
}

/**
 * Client-specific schema used for React Hook Form validation
 * Uses File[] for attachments (direct file uploads)
 */
export const ClientFormSchema = z
  .object({
    ...BaseFormSchema,
    [FIELD_IDS.contribution]: z
      .union([z.literal(''), z.enum(['rengifo', 'covico'] as const)])
      .optional()
      .transform((v) => (v === '' || v === undefined ? undefined : v)),
    [FIELD_IDS.attachments]: z
      .array(z.instanceof(File))
      .optional()
      .nullable()
      .transform((v) => v ?? []),
  })
  .superRefine((data, ctx) => {
    const contribution = data[FIELD_IDS.contribution]
    const attachments = data[FIELD_IDS.attachments] as File[]

    // Rule: if contribution is selected (not the default ''), require at least one attachment
    if (contribution && attachments.length === 0) {
      // Root-level error for centralized message in UI
      ctx.addIssue({
        code: 'custom',
        message: formErrors.ContributionRequiresAttachment,
        path: [FIELD_IDS.attachments],
      })
    }
  })

/**
 * Server-specific schema used for server-side validation
 * Uses string[] for attachments (uploaded blob URLs)
 */
export const ServerFormSchema = z.object({
  ...BaseFormSchema,
  [FIELD_IDS.contribution]: z
    .union([
      z.undefined(),
      z.null(),
      z.literal(''),
      z.enum(['rengifo', 'covico'] as const),
    ])
    .transform((v) => (v == null || v === '' ? undefined : v))
    .optional(),
  [FIELD_IDS.attachments]: z
    .array(z.url(formErrors.AttachmentUrlInvalid))
    .optional()
    .default([]),
})

// Infer types from schemas
export type ClientFormValues = z.infer<typeof ClientFormSchema>
export type ServerFormValues = z.infer<typeof ServerFormSchema>
