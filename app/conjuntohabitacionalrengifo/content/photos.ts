import { BRAND } from '@/content/brand'
import { PhotoContent } from '@/rengifo/types/content'
import { formatPath } from '@/utils/format'

export const photosContent: PhotoContent = {
  id: 'photos',
  title: 'Imaginario Urbano',
  subTitle: 'Imaginario Barrial',
  utilityImages: {
    bg: {
      src: formatPath(`${BRAND.paths.rengifo}/fondo1.2.webp`),
      width: 1366,
      height: 1300,
      alt: 'Fondo de la sección de fotos',
    },
  },
  cards: {
    photos: {
      id: 'photos',
      title: 'Archivo',
      subTitle: 'Fotográfico',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/archivo.jpg`),
        width: 600,
        height: 748,
        alt: 'Fotografía de archivo del barrio Rengifo',
      },
    },

    activities: {
      id: 'activities',
      title: 'Fotografías',
      subTitle: 'Actividades',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/actividades.jpg`),
        width: 800,
        height: 1067,
        alt: 'Fotografía de actividades comunitarias en el barrio Rengifo',
      },
    },

    aerials: {
      id: 'aerials',
      title: 'Fotografías',
      subTitle: 'Aéreas',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/aereas.jpg`),
        width: 442,
        height: 444,
        alt: 'Fotografía aérea del barrio Rengifo',
      },
    },

    exterior: {
      id: 'exterior',
      title: 'Recorrido 3D',
      subTitle: 'Exterior',
      href: '',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/exterior.jpg`),
        width: 900,
        height: 600,
        alt: 'Recorrido 3D exterior del barrio Rengifo',
      },
      disabled: true,
    },

    interior: {
      id: 'interior',
      title: 'Recorrido 3D',
      subTitle: 'Interior',
      href: '',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/interior.jpg`),
        width: 899,
        height: 696,
        alt: 'Recorrido 3D interior del barrio Rengifo',
      },
      disabled: true,
    },
  },

  gallery: {
    photos: {
      id: 'photos',
      images: [
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/2 Mariana Ochoa.jpg`
          ),
          name: 'Imagen cedida por Mariana Ochoa',
          alt: 'Fotografía de Mariana Ochoa',
          width: 869,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/3 Mariana Ochoa.jpg`
          ),
          name: 'Imagen cedida por Mariana Ochoa',
          alt: 'Fotografía de Mariana Ochoa',
          width: 1080,
          height: 696,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/4 Patricia.jpg`
          ),
          name: 'Imagen cedida por Patricia',
          alt: 'Fotografía de Patricia',
          width: 1080,
          height: 826,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/6 Patricia.jpg`
          ),
          name: 'Imagen cedida por Patricia',
          alt: 'Fotografía de Patricia',
          width: 751,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/15 Patricia (reverso foto 4).jpg`
          ),
          name: 'Imagen cedida por Patricia (reverso foto 4)',
          alt: 'Fotografía reverso de Patricia',
          width: 1080,
          height: 819,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/20 Jaqueline Ayala.jpg`
          ),
          name: 'Imagen cedida por Jaqueline Ayala',
          alt: 'Fotografía de Jaqueline Ayala',
          width: 1080,
          height: 685,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/22 Jaqueline Ayala.jpg`
          ),
          name: 'Imagen cedida por Jaqueline Ayala',
          alt: 'Fotografía de Jaqueline Ayala',
          width: 1080,
          height: 717,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/27 Iván Barraza.jpg`
          ),
          name: 'Imagen cedida por Iván Barraza',
          alt: 'Fotografía de Iván Barraza',
          width: 1080,
          height: 673,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/30 Iván Barraza.jpg`
          ),
          name: 'Imagen cedida por Iván Barraza',
          alt: 'Fotografía de Iván Barraza',
          width: 1080,
          height: 691,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/32 Iván Barraza.jpg`
          ),
          name: 'Imagen cedida por Iván Barraza',
          alt: 'Fotografía de Iván Barraza',
          width: 1080,
          height: 683,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/43 Andrea Jorquera.jpg`
          ),
          name: 'Imagen cedida por Andrea Jorquera',
          alt: 'Fotografía de Andrea Jorquera',
          width: 1080,
          height: 791,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/45 Andrea Jorquera.jpg`
          ),
          name: 'Imagen cedida por Andrea Jorquera',
          alt: 'Fotografía de Andrea Jorquera',
          width: 1080,
          height: 720,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/archivo/46 Andrea Jorquera.jpg`
          ),
          name: 'Imagen cedida por Andrea Jorquera',
          alt: 'Fotografía de Andrea Jorquera',
          width: 775,
          height: 1080,
        },
      ],
    },

    activities: {
      id: 'activities',
      images: [
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-01.jpg`
          ),
          name: 'Actividad Comunitaria 01',
          alt: 'Fotografía de la actividad comunitaria 01',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-02.jpg`
          ),
          name: 'Actividad Comunitaria 02',
          alt: 'Fotografía de la actividad comunitaria 02',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-03.jpg`
          ),
          name: 'Actividad Comunitaria 03',
          alt: 'Fotografía de la actividad comunitaria 03',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-04.jpg`
          ),
          name: 'Actividad Comunitaria 04',
          alt: 'Fotografía de la actividad comunitaria 04',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-05.jpg`
          ),
          name: 'Actividad Comunitaria 05',
          alt: 'Fotografía de la actividad comunitaria 05',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-06.jpg`
          ),
          name: 'Actividad Comunitaria 06',
          alt: 'Fotografía de la actividad comunitaria 06',
          width: 720,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-07.jpg`
          ),
          name: 'Actividad Comunitaria 07',
          alt: 'Fotografía de la actividad comunitaria 07',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-08.jpg`
          ),
          name: 'Actividad Comunitaria 08',
          alt: 'Fotografía de la actividad comunitaria 08',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-09.jpg`
          ),
          name: 'Actividad Comunitaria 09',
          alt: 'Fotografía de la actividad comunitaria 09',
          width: 810,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-10.jpg`
          ),
          name: 'Actividad Comunitaria 10',
          alt: 'Fotografía de la actividad comunitaria 10',
          width: 1080,
          height: 810,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-11.jpg`
          ),
          name: 'Actividad Comunitaria 11',
          alt: 'Fotografía de la actividad comunitaria 11',
          width: 1080,
          height: 720,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-12.jpg`
          ),
          name: 'Actividad Comunitaria 12',
          alt: 'Fotografía de la actividad comunitaria 12',
          width: 1080,
          height: 1619,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-13.jpg`
          ),
          name: 'Actividad Comunitaria 13',
          alt: 'Fotografía de la actividad comunitaria 13',
          width: 1080,
          height: 720,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-14.jpg`
          ),
          name: 'Actividad Comunitaria 14',
          alt: 'Fotografía de la actividad comunitaria 14',
          width: 720,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/actividades/ACT-15.jpg`
          ),
          name: 'Actividad Comunitaria 15',
          alt: 'Fotografía de la actividad comunitaria 15',
          width: 720,
          height: 1080,
        },
      ],
    },

    aerials: {
      id: 'aerials',
      images: [
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-01.jpg`),
          name: 'Vista Aérea 01',
          alt: 'Fotografía aérea número 01',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-02.jpg`),
          name: 'Vista Aérea 02',
          alt: 'Fotografía aérea número 02',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-03.jpg`),
          name: 'Vista Aérea 03',
          alt: 'Fotografía aérea número 03',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-04.jpg`),
          name: 'Vista Aérea 04',
          alt: 'Fotografía aérea número 04',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-05.jpg`),
          name: 'Vista Aérea 05',
          alt: 'Fotografía aérea número 05',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-06.jpg`),
          name: 'Vista Aérea 06',
          alt: 'Fotografía aérea número 06',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-07.jpg`),
          name: 'Vista Aérea 07',
          alt: 'Fotografía aérea número 07',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-08.jpg`),
          name: 'Vista Aérea 08',
          alt: 'Fotografía aérea número 08',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-09.jpg`),
          name: 'Vista Aérea 09',
          alt: 'Fotografía aérea número 09',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-10.jpg`),
          name: 'Vista Aérea 10',
          alt: 'Fotografía aérea número 10',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-11.jpg`),
          name: 'Vista Aérea 11',
          alt: 'Fotografía aérea número 11',
          width: 1080,
          height: 608,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-12.jpg`),
          name: 'Vista Aérea 12',
          alt: 'Fotografía aérea número 12',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-13.jpg`),
          name: 'Vista Aérea 13',
          alt: 'Fotografía aérea número 13',
          width: 1080,
          height: 607,
        },
        {
          src: formatPath(`${BRAND.paths.rengifo}/images/aereas/DRON-14.jpg`),
          name: 'Vista Aérea 14',
          alt: 'Fotografía aérea número 14',
          width: 1080,
          height: 607,
        },
      ],
    },
  },
} as const
