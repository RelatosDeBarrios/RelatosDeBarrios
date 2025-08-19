/**
 * Domain model types for the contact form data.
 * These represent the business domain entities after form validation.
 */
export type DomainFormData = {
  form_name: string
  form_email: string
  form_commentary: string
  form_contribution?: 'rengifo' | 'covico'
  form_attachments: File[] | string[]
}

/**
 * Server-side domain model where attachments are always URLs
 */
export type ServerDomainFormData = {
  form_name: string
  form_email: string
  form_commentary: string
  form_contribution?: 'rengifo' | 'covico'
  form_attachments: string[]
}
