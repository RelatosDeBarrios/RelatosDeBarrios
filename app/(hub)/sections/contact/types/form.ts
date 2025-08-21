import { ProjectsId } from '@/types/core'
import { AttachmentsType } from './attachments'
import { CONTACT } from '../content'

export interface InputType {
  id: string
  type: 'text' | 'email' | 'file' | 'textarea' | 'select' | 'name'
  label: string
  autocomplete?: string
  placeholder?: string
  required: boolean
}

export interface SubmitButtonType {
  id: string
  type: 'submit'
  label: string
}

export interface ContributionType extends InputType {
  options: {
    id: ProjectsId | '' | undefined
    label: string
  }[]
}

export type ContactForm = {
  name: InputType
  email: InputType
  commentary: InputType
  contribution: ContributionType
  attachments: AttachmentsType
  submit: SubmitButtonType
}

export type FormFieldIds = {
  [K in keyof typeof CONTACT.form]: (typeof CONTACT.form)[K] extends {
    id: string
  }
    ? (typeof CONTACT.form)[K]['id']
    : never
}[keyof typeof CONTACT.form]
