/**
 * User Interface domain types
 * Contains types for UI texts, navigation, and user-facing elements
 */

export interface UIButtonsContent {
  readonly save: string
  readonly cancel: string
  readonly submit: string
  readonly close: string
  readonly back: string
  readonly next: string
  readonly previous: string
  readonly download: string
  readonly share: string
  readonly contact: string
}

export interface UIFormsContent {
  readonly required: string
  readonly email_invalid: string
  readonly name_placeholder: string
  readonly email_placeholder: string
  readonly message_placeholder: string
  readonly submit_success: string
  readonly submit_error: string
}

export interface UIMessagesContent {
  [key: string]: string
}

export interface UIContent {
  readonly buttons: UIButtonsContent
  readonly forms: UIFormsContent
  readonly messages: UIMessagesContent
}
