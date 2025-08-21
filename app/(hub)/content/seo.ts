import type { SEOContent } from '@/types/seo'

/**
 * SEO and metadata configuration
 * Contains search engine optimization settings and social media metadata
 */
export const SEO: SEOContent = {
  title: 'Relatos de Barrios',
  description:
    'Descubre el patrimonio industrial y habitacional de La Serena y Coquimbo. Historia, memoria, arquitectura y urbanismo que forman la identidad regional.',
  keywords: [
    'Relatos de Barrios',
    'patrimonio industrial',
    'patrimonio habitacional',
    'La Serena',
    'Coquimbo',
    'historia',
    'memoria',
    'arquitectura',
    'urbanismo',
    'identidad regional',
    'Chile',
  ],
  url: 'https://relatosdebarrios.cl',
  icons: '/hub/favicon.png',
  openGraph: {
    title: 'Relatos de Barrios',
    description:
      'Descubre el patrimonio industrial y habitacional de La Serena y Coquimbo. Historia, memoria, arquitectura y urbanismo que forman la identidad regional.',
    image: '/',
    type: 'website',
  },
  twitter: {
    site: '@relatosdebarrios',
    creator: '@relatosdebarrios',
  },
} as const
