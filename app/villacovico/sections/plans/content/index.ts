import { Plans } from '../types'

export const PLANS = {
  id: 'plans',
  title: 'Planimetrías',
  cards: {
    isometrics: {
      id: 'isometrics',
      title: 'Isométricas',
      subTitle: '3D',
      description: '',
      downloadLink: '/villacovico/sections/plans/downloads/ISOMETRICAS_VILLA_COVICO.zip',
      collection: [
        {
          src: '/villacovico/sections/plans/isometrics/CONJUNTO_PARTE_1_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/CONJUNTO_PARTE_2_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/CONJUNTO_PARTE_3_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/DIDECO_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/ESTACION_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/SERVICIO SALUD_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/VIVIENDA FFEE_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/VIVIENDA ING_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
        {
          src: '/villacovico/sections/plans/isometrics/VIVIENDA PAREADA_ISO_A3.jpg',
          alt: '',
          width: 1440,
          height: 1018,
        },
      ],
    },
    'floor-plans': {
      id: 'floor-plans',
      title: 'Plantas',
      subTitle: '2D',
      description: '',
      downloadLink: '/villacovico/sections/plans/downloads/PLANTAS_VILLA_COVICO.zip',
      collection: [
        {
          src: '/villacovico/sections/plans/floor-plans/LAMINA_DE_ARQUITECTURA__ALESSANDRI_N�1095.jpg',
          alt: '',
          height: 859,
          width: 1440,
        },
        {
          src: '/villacovico/sections/plans/floor-plans/LAMINA_DE_ARQUITECTURA__ALESSANDRI_N�1109.jpg',
          alt: '',
          height: 1152,
          width: 1440,
        },
        {
          src: '/villacovico/sections/plans/floor-plans/LAMINA_DE_ARQUITECTURA__PASAJE_ESTACION_N�1207.jpg',
          alt: '',
          height: 903,
          width: 1440,
        },
        {
          src: '/villacovico/sections/plans/floor-plans/LAMINA_DE_ARQUITECTURA__PASAJE_ESTACION_N�1211.jpg',
          alt: '',
          height: 911,
          width: 1440,
        },
        {
          src: '/villacovico/sections/plans/floor-plans/SAI_7585_ARGOS_1233_PLANIMETR�A.jpg',
          alt: '',
          width: 1440,
          height: 861,
        },
      ],
    },
  },
} satisfies Plans
