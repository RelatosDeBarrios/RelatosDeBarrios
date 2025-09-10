import { BRAND } from '@/content/brand'
import { HeroSection } from '../types'

export const HERO = {
  id: 'home',
  title: 'Relatos de Barrios | Villa Covico',
  description: 'Voces que construyen identidad en los barrios de la Región de Coquimbo.',
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
      disabled: false,
      bg: {
        src: '/hub/images/portada_villacovico.webp',
        alt: 'Ir a Relatos de Barrios: Villa Covico',
        width: 800,
        height: 612,
      },
    },
    rengifo: {
      id: 'rengifo',
      title: '## Conjunto Habitacional **Rengifo**',
      href: BRAND.paths.rengifo,
      disabled: false,
      bg: {
        src: '/hub/videos/rengifo-teaser.mp4',
        autoplay: true,
        loop: true,
        muted: true,
        preload: 'auto',
      },
    },
  },
} satisfies HeroSection
