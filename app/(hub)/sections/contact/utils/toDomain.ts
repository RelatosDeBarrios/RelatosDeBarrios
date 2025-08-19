import { FIELD_IDS, ClientFormValues } from '../schemas/formSchema'
import type { DomainFormData } from '../types/domain'

/**
 * Converts form values from React Hook Form to our domain model.
 * This ensures we have a clean boundary between UI schema and domain model.
 */
export function toDomain(values: ClientFormValues): DomainFormData {
  const contribution = values[FIELD_IDS.contribution]

  // Cast field values to correct types with defaults
  const name = values[FIELD_IDS.name]
  const email = values[FIELD_IDS.email]
  const commentary = values[FIELD_IDS.commentary]
  const attachments = values[FIELD_IDS.attachments]

  return {
    form_name: typeof name === 'string' ? name : '',
    form_email: typeof email === 'string' ? email : '',
    form_commentary: typeof commentary === 'string' ? commentary : '',
    form_contribution:
      contribution && contribution !== ''
        ? (contribution as 'rengifo' | 'covico')
        : undefined,
    form_attachments: Array.isArray(attachments) ? attachments : [],
  }
}
