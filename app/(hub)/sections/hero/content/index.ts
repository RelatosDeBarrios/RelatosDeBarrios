import { BRAND } from '@/content/brand'
import { HeroSection } from '../types'

export const HERO: HeroSection = {
  id: 'home',
  title: 'Relatos de Barrios | Villa Covico',
  description:
    'Voces que construyen identidad en los barrios de la Región de Coquimbo.',
  utilityImages: {
    logo: {
      src: '/hub/images/hero-blue.png',
      alt: 'Logo de Relatos de Barrios',
      width: 772,
      height: 325,
    },
  },
  cards: {
    covico: {
      id: 'covico',
      title: '## Villa **Covico**',
      href: BRAND.paths.covico,
      bg: {
        src: '/hub/images/placeholder.png',
        alt: 'Placeholder image for Villa Covico',
        width: 300,
        height: 300,
      },
    },
    rengifo: {
      id: 'rengifo',
      title: '## Conjunto Habitacional **Rengifo**',
      href: BRAND.paths.rengifo,
      bg: {
        src: '/hub/videos/rengifo-teaser.mp4',
        autoplay: true,
        loop: true,
        muted: true,
        preload: 'auto',
      },
    },
  },
} as const
