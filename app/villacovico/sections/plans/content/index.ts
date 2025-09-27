import { Plans } from '../types'

export const PLANS = {
  id: 'plans',
  title: 'Planimetrías',
  cards: {
    isometric: {
      id: 'isometric',
      title: 'Isométricas',
      subTitle: '3D',
      description: '',
      downloadLink: '',
      collection: [],
      bg: {
        src: '',
        alt: '',
        width: 0,
        height: 0,
      },
    },
    'floor-plans': {
      id: 'floor-plans',
      title: 'Plantas',
      subTitle: '2D',
      description: '',
      downloadLink: '',
      collection: [],
      bg: {
        src: '',
        alt: '',
        width: 0,
        height: 0,
      },
    },
  },
} satisfies Plans
