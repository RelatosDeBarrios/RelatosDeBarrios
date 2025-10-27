import { BookDocumental } from '../types'

export const BOOK_DOCUMENTAL = {
  id: 'book-documental',
  title: 'Libro y Documental',
  cards: {
    book: {
      id: 'book',
      title: 'Libro',
      subTitle: 'Villa Covico',
      description:
        'Un recorrido visual y narrativo por la historia, arquitectura y cultura de Villa Covico.',
      href: '/villacovico/Relatosdebarrio-villacovico-final.pdf',
      bg: {
        src: '/hub/images/portada_villacovico.webp',
        alt: 'Portada del libro Villa Covico',
        width: 600,
        height: 800,
      },
    },
    documental: {
      id: 'documental',
      title: 'Documental',
      subTitle: 'Villa Covico',
      description:
        'Una mirada profunda a la historia y el impacto cultural de Villa Covico a través de entrevistas y material de archivo.',
      href: 'https://www.youtube.com/watch?v=HC67weLl5o4',
      bg: {
        src: '/villacovico/sections/book-documental/docu.webp',
        alt: 'Portada del documental Villa Covico',
        width: 600,
        height: 800,
      },
    },
  },
} satisfies BookDocumental
