import { CovicoSection } from '@/app/villacovico/types'

export const QUOTES = {
  1: {
    id: 'quote-1',
    title: 'UNA VIDA ENTRE RIELES Y MEMORIAS',
    description:
      'Entré a trabajar ahí, y jubilé en ferrocarriles. Terminar mi vida laboral en el mismo lugar donde todo comenzó, eso para mí tiene un valor incalculable',
    author: {
      name: 'CARLOS JORQUERA',
      age: 81,
    },
  },
  2: {
    id: 'quote-2',
    title: 'OFICIO Y COMUNIDAD EN TIEMPOS DE FERROCARRIL',
    description:
      'Ferrocarriles fue mi escuela. Aprendí un oficio que me permitió desarrollarme, crecer y formar una familia. Me gustaría que la historia del barrio no se pierda, que quienes vengan después entiendan que aquí hubo una comunidad forjada en el esfuerzo y el trabajo ferroviario. Nos dieron las casas y nos dejaron solos, pero aún seguimos aquí, tratando de conservar lo que queda de nuestra historia',
    author: {
      name: 'HÉCTOR EUSTAQUIO CABEZA VARGAS',
      age: 85,
    },
  },
  3: {
    id: 'quote-3',
    title: 'HERENCIA FERROVIARIA ENTRE GENERACIONES',
    description:
      'Ferrocarriles fue el motor de la economía en su tiempo. Deberíamos tener un museo de la memoria, con elementos ferroviarios, para que las nuevas generaciones conozcan esta historia',
    author: {
      name: 'JUAN CARLOS VALENCIA',
      age: 73,
    },
  },
} satisfies Record<
  number,
  CovicoSection & {
    author: {
      name: string
      age: number
    }
  }
>
