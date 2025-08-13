import { ProjectsId } from '@/types/core'
import { AttachmentsType } from './attachments'
import { CONTACT } from '../content'

export interface InputType {
  id: string
  type: 'text' | 'email' | 'file' | 'textarea' | 'select'
  label: string
  placeholder?: string
  required: boolean
  requiredMessage?: string
  invalidMessage?: string
}

export interface SubmitButtonType {
  id: string
  type: 'submit'
  label: string
  success: string
  error: {
    validation: string
    server: string
  }
}

export interface ContributionType extends InputType {
  options: {
    id: ProjectsId | ''
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
