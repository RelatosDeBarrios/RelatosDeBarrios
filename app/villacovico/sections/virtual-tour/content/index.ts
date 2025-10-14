import { VirtualTour } from '../types'

export const VIRTUAL_TOUR = {
  id: 'virtual-tour',
  title: 'Recorrido Virtual',
  cards: {
    outside: {
      id: 'outside',
      title: 'Recorrido 3D',
      subTitle: 'Exterior',
      description: '',
      href: 'https://app.cloudpano.com/tours/EieASvgq8',
      bg: {
        src: '/villacovico/sections/virtual-tour/outside.webp',
        alt: '',
        width: 1920,
        height: 1080,
      },
    },
    inside: {
      id: 'inside',
      title: 'Recorrido 3D',
      subTitle: 'Interior',
      description: '',
      href: 'https://app.cloudpano.com/tours/rHmDzjHtr?sceneId=h1gLeY0Nzh7',
      bg: {
        src: '/villacovico/sections/virtual-tour/inside.webp',
        alt: '',
        width: 1920,
        height: 1080,
      },
    },
  },
} satisfies VirtualTour
