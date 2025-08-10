import type { UIContent } from '@/types/ui'

/**
 * User interface text strings and labels
 * Contains all user-facing text content for consistent UX across apps
 */
export const UI: UIContent = {
  buttons: {
    save: 'Guardar',
    cancel: 'Cancelar',
    submit: 'Enviar',
    close: 'Cerrar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    download: 'Descargar',
    share: 'Compartir',
    contact: 'Contactar',
  },
  forms: {
    required: 'Campo requerido',
    email_invalid: 'Email inválido',
    name_placeholder: 'Nombre completo',
    email_placeholder: 'Correo electrónico',
    message_placeholder: 'Mensaje',
    submit_success: 'Mensaje enviado correctamente',
    submit_error: 'Error al enviar el mensaje',
  },
  messages: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    not_found: 'Página no encontrada',
    coming_soon: 'Próximamente',
    not_available: 'No disponible',
  },
} as const
