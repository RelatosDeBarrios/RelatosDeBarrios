import { Nav } from '../types'

export const NAV = {
  id: 'nav',
  utilityImages: {
    logo: {
      src: '/villacovico/logo.webp',
      alt: 'Relatos de Barrios Logo',
      height: 221,
      width: 500,
    },
  },
  navItems: [
    { href: 'top', label: 'Inicio' },
    { href: '#visual-archive', label: 'Archivo Visual' },
    { href: '#plans', label: 'Planimetrías' },
    { href: '#virtual-tour', label: 'Recorridos' },
    { href: '#book-documental', label: 'Libro / Documental' },
  ],
} satisfies Nav
