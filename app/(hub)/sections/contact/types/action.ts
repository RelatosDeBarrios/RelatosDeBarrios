import { ProjectsId } from '@/types/core'
import { ZodError } from 'zod'

export type SendEmailAction = (
  prevState: ActionState,
  formData: FormData
) => SendEmailResponse

export type SendEmailResponse = Promise<ActionState>

export type ActionState = {
  ok: boolean | null
  error: Error | ZodError | unknown | null
  message?: string
}

export type ActionFormData = {
  name: string
  email: string
  commentary: string
  contribution: ProjectsId
  attachments: string[]
}
