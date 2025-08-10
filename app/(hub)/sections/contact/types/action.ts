export type SendEmailAction = (
  prevState: ActionState,
  formData: FormData
) => SendEmailResponse

export type SendEmailResponse = Promise<ActionState>

export type ActionState = {
  ok: boolean | null
}
