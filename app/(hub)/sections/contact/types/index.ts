import { SectionsId } from '@/app/(hub)/types'
import { ContactForm } from './form'
import { Section } from '@/types/general'

export interface ContactSection extends Section<SectionsId> {
  form: ContactForm
}
