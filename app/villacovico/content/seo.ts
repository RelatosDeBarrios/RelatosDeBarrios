import type { SEOContent } from '@/types/seo'

// TODO: update metadata for Villa Covico
export const SEO: SEOContent = {
  title: 'Villa Covico',
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
  url: 'https://relatosdebarrios.cl/villacovico',
  icons: '/villacovico/logo.png',
  openGraph: {
    title: 'Villa Covico',
    description:
      'Descubre el patrimonio industrial y habitacional de La Serena y Coquimbo. Historia, memoria, arquitectura y urbanismo que forman la identidad regional.',
    image: '/villacovico',
    type: 'website',
  },
  twitter: {
    site: '@relatosdebarrios',
    creator: '@relatosdebarrios',
  },
} as const
