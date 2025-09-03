import { CovicoSection } from '@/app/villacovico/types'

export const HERO = {
  id: 'hero',
  title: 'Villa Covico',
  description:
    'A través de testimonios orales, archivos visuales y relatos personales de sus habitantes, se reconstruye la historia del barrio como un espacio habitado profundamente vinculado al ferrocarril. El proyecto destaca cómo la vivienda ferroviaria no solo representó infraestructura habitacional, sino también un núcleo comunitario que articuló dinámicas sociales, culturales y urbanas. Este segundo volumen de la colección Relatos de Barrios busca preservar, visibilizar y resignificar el legado histórico y afectivo del barrio, relevando la importancia de la memoria local en la construcción del patrimonio regional.',
  utilityImages: {
    bg_under: {
      src: '/villacovico/portada_bottom.webp',
      alt: 'Fachada de una casa de la Villa Covico con un árbol en primer plano',
      width: 1620,
      height: 1620,
    },
    bg_over: {
      src: '/villacovico/portada_top.webp',
      alt: 'Fachada de una casa de la Villa Covico con un árbol en primer plano',
      width: 1620,
      height: 1620,
    },
  },
} satisfies CovicoSection
