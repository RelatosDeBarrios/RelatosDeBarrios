import { ProjectsId } from '@/types/core'
import { ZodError } from 'zod'

export type SendEmailAction = (
  prevState: ActionState,
  formData: FormData
) => SendEmailResponse

export type SendEmailResponse = Promise<ActionState>

export type ActionState = {
  success: boolean | null
  error: Error | ZodError | unknown | null
  messages?: string
}

export type ActionFormData = {
  name: string
  email: string
  commentary: string
  contribution: ProjectsId
  attachments: string[]
}
