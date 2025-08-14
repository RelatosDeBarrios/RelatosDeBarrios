import { CONTACT } from '../content'

interface DomainFormData {
  form_name: string
  form_email: string
  form_commentary: string
  form_contribution: string | undefined
  form_attachments: File[]
}

export const parseFormData = (formData: FormData): DomainFormData => {
  return {
    form_name: formData.get(CONTACT.form.name.id),
    form_email: formData.get(CONTACT.form.email.id),
    form_commentary: formData.get(CONTACT.form.commentary.id),
    form_contribution: formData.get(CONTACT.form.contribution.id),
    form_attachments: formData.getAll(CONTACT.form.attachments.id),
  } as DomainFormData
}
