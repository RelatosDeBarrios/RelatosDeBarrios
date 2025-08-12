import { BRAND } from '@/content/brand'
import { ContactSection } from '../types'

export const CONTACT: ContactSection = {
  id: 'contact',
  title: 'Contacto',
  subTitle: '¿Tienes alguna pregunta o comentario?',
  form: {
    name: {
      id: 'form_name',
      type: 'text',
      label: 'Nombre',
      placeholder: 'Nombre completo',
      required: true,
      requiredMessage: 'Por favor ingresa tu nombre',
    },
    email: {
      id: 'form_email',
      type: 'email',
      label: 'Correo electrónico',
      placeholder: 'ejemplo@correo.com',
      required: true,
      requiredMessage: 'Por favor ingresa tu correo electrónico',
      invalidMessage: 'Por favor ingresa un correo electrónico válido',
    },
    commentary: {
      id: 'form_commentary',
      type: 'textarea',
      label: 'Mensaje',
      placeholder: 'Escribe tu mensaje aquí',
      required: true,
      requiredMessage: 'Por favor ingresa un mensaje',
    },
    contribution: {
      id: 'form_project',
      type: 'select',
      label: '¿Deseas aportar material a alguno de nuestros proyectos?',
      options: [
        {
          id: '',
          label: 'Sin material para aportar',
        },
        {
          id: 'rengifo',
          label: BRAND.projects.rengifo,
        },
        {
          id: 'covico',
          label: BRAND.projects.covico,
        },
      ],
      required: false,
    },
    attachments: {
      id: 'form_attachments',
      type: 'file',
      label: 'Archivos adjuntos',
      placeholder: 'Arrastra aquí tus archivos o haz clic para seleccionarlos',
      required: false,
      maxSize: 30,
      accept: {
        'image/*': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
      },
    },
    submit: {
      id: 'form_button',
      type: 'submit',
      label: 'Enviar mensaje',
      success:
        'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.',
      error: {
        validation: 'Por favor completa todos los campos requeridos',
        server:
          'Ocurrió un error al enviar tu mensaje. Por favor intenta nuevamente más tarde.',
      },
    },
  },
}
