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
      autocomplete: 'name',
      placeholder: 'Nombre completo',
      required: true,
    },
    email: {
      id: 'form_email',
      type: 'email',
      label: 'Correo electrónico',
      placeholder: 'ejemplo@correo.com',
      required: true,
    },
    commentary: {
      id: 'form_commentary',
      type: 'textarea',
      label: 'Mensaje',
      placeholder: 'Escribe tu mensaje aquí',
      required: true,
    },
    contribution: {
      id: 'form_contribution',
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
    },
  },
}
