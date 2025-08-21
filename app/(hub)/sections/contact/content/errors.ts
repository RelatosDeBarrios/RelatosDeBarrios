export const formErrors = {
  ValidationFailed: 'Validación fallida. Revisa tus datos.',
  InvalidEmail: 'El correo electrónico no es válido.',
  RequiredField: 'Este campo es obligatorio.',
  CommentaryTooLong: 'El comentario no puede exceder los 3000 caracteres.',
  NameTooShort: 'Debe contener más de 2 caracteres',
  NameTooLong: 'El nombre no puede exceder los 100 caracteres',
  AttachmentUrlInvalid: 'URL inválida para archivo adjunto',

  // Centralized field required/invalid messages (used by schema/UI)
  NameRequired: 'Por favor ingresa tu nombre',
  EmailRequired: 'Por favor ingresa tu correo electrónico',
  EmailInvalid: 'Por favor ingresa un correo electrónico válido',
  CommentaryRequired: 'Por favor ingresa un mensaje',

  // Cross-field client-side rule
  ContributionRequiresAttachment:
    'Adjunta al menos un archivo o deja "Sin material para aportar".',

  UploadValidationNeeded: 'Valida el envío antes de subir archivos.',
  UploadExpired: 'La validación expiró. Actualiza e inténtalo de nuevo.',
  UploadRateLimited: 'Has alcanzado el límite de envíos por hoy.',
  UploadFailed: 'No se pudieron subir los archivos. Inténtalo más tarde.',
  UploadClientError: 'No se pudo validar tu identidad.',

  SendSuccess: 'Tu mensaje fue enviado con éxito. ¡Gracias!',
  SendFailed: 'No se pudo enviar el mensaje. Inténtalo más tarde.',
  Unexpected: 'Ocurrió un error inesperado. Inténtalo de nuevo.',

  RetryAfterTemplate: 'Inténtalo de nuevo en {seconds}.',
} as const

export type FormErrorKey = keyof typeof formErrors
