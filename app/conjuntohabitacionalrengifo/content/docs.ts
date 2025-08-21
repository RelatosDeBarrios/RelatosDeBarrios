/**
 * Rengifo Project Contenturation
 * Main project description, title, and overview content
 */

import { BRAND } from '@/content/brand'
import { DocsContent } from '@/rengifo/types/content'
import { formatPath } from '@/utils/format'

export const docsContent: DocsContent = {
  id: 'docs',
  title: 'Arquitectura de lo Doméstico',
  description: `Recopilación de las planimetrías y documentos físicos originales correspondientes al proyecto “Casas para obreros CCU, La Serena” posteriormente denominado como “Conjunto Habitacional Rengifo”, diseñado en 1957 por el arquitecto Carlos Feuereisen Polanco, y construido en el año 1958 por Negochea y Vergara.

  El proyecto se ubica en el norte de la zona típica de La Serena y es de una tipología característica de la vivienda en la ciudad. Representa el estilo del Plan Serena a pesar de ser posterior (1958) y denota la intención de consolidar la ciudad con edificios de vivienda.`,
  utilityImages: {
    bg: {
      src: formatPath(`${BRAND.paths.rengifo}/fondoPersonas.webp`),
      width: 1440,
      height: 1425,
      alt: 'Fondo con personas del barrio Rengifo',
    },
    bottom: {
      src: formatPath(`${BRAND.paths.rengifo}/fachada.webp`),
      width: 1440,
      height: 314,
      alt: 'Fachada de las casas del barrio Rengifo',
    },
  },

  cards: {
    planimetries: {
      id: 'planimetries',
      title: 'Planimetrías',
      subTitle: 'originales',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/plani.jpg`),
        width: 700,
        height: 741,
        alt: 'Planimetría original del proyecto Rengifo',
      },
    },
    survey: {
      id: 'survey',
      title: 'Levantamiento',
      subTitle: 'digital',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/levan.jpg`),
        width: 600,
        height: 949,
        alt: 'Levantamiento digital del proyecto Rengifo',
      },
    },
  },

  gallery: {
    planimetries: {
      id: 'planimetries',
      images: [
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Planos-01.jpg`
          ),
          name: 'Plano 01',
          width: 1080,
          height: 719,
          alt: 'Planimetría original número 1 del proyecto Rengifo',
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Planos-02.jpg`
          ),
          name: 'Plano 02',
          width: 1080,
          height: 713,
          alt: 'Planimetría original número 2 del proyecto Rengifo',
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Planos-03.jpg`
          ),
          name: 'Plano 03',
          width: 1080,
          height: 706,
          alt: 'Planimetría original número 3 del proyecto Rengifo',
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Planos-04.jpg`
          ),
          name: 'Plano 04',
          alt: 'Planimetría original número 4 del proyecto Rengifo',
          width: 1080,
          height: 756,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Planos-05.jpg`
          ),
          name: 'Plano 05',
          alt: 'Planimetría original número 5 del proyecto Rengifo',
          width: 1080,
          height: 828,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Doc-06.jpg`
          ),
          name: 'Documento 06',
          alt: 'Documento original número 6 del proyecto Rengifo',
          width: 656,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Doc-07.jpg`
          ),
          name: 'Documento 07',
          alt: 'Documento original número 7 del proyecto Rengifo',
          width: 1080,
          height: 699,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/planimetrias/Doc-08.jpg`
          ),
          name: 'Documento 08',
          alt: 'Documento original número 8 del proyecto Rengifo',
          width: 1080,
          height: 699,
        },
      ],
    },

    survey: {
      id: 'survey',
      images: [
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/levantamiento/ISO-01.jpg`
          ),
          name: 'Isométrica 01',
          alt: 'Levantamiento isométrico número 1 del proyecto Rengifo',
          width: 1529,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/levantamiento/ISO-02.jpg`
          ),
          name: 'Isométrica 02',
          alt: 'Levantamiento isométrico número 2 del proyecto Rengifo',
          width: 1529,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/levantamiento/ISO-03.jpg`
          ),
          name: 'Isométrica 03',
          alt: 'Levantamiento isométrico número 3 del proyecto Rengifo',
          width: 1529,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/levantamiento/ISO-04.jpg`
          ),
          name: 'Isométrica 04',
          alt: 'Levantamiento isométrico número 4 del proyecto Rengifo',
          width: 1529,
          height: 1080,
        },
        {
          src: formatPath(
            `${BRAND.paths.rengifo}/images/levantamiento/ISO-05.jpg`
          ),
          name: 'Isométrica 05',
          alt: 'Levantamiento isométrico número 5 del proyecto Rengifo',
          width: 1529,
          height: 1080,
        },
      ],
    },
  },
} as const
