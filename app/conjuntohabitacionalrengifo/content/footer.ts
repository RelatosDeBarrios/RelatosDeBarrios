import { BRAND } from '@/content/brand'
import { FooterContent } from '@/rengifo/types/content'
import { formatPath } from '@/utils/format'

export const footerContent: FooterContent = {
  id: 'footer',
  title: 'Relatos de Barrios - Universidad de La Serena',
  utilityImages: {
    bg: {
      src: formatPath(`${BRAND.paths.rengifo}/muroPiedra.webp`),
      alt: 'Muro de piedra del barrio Rengifo',
      width: 1440,
      height: 675,
    },
  },
  socialLinks: [
    {
      id: 'youtube',
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UChyh4l-EFiNCeIs3K33nz_Q',
      icon: 'Youtube',
    },
    {
      id: 'email',
      name: 'Email',
      href: 'mailto:relatosdebarrio.ls@gmail.com?subject=Consulta Relatos de Barrios',
      icon: 'Mail',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://www.instagram.com/relatosdebarrios/',
      icon: 'Instagram',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: 'https://www.facebook.com/Relatos-de-Barrios-101242745453386/',
      icon: 'Facebook',
    },
  ],

  credits: {
    collaborators: [
      {
        src: formatPath(`${BRAND.paths.rengifo}/images/logos/MINCAP.png`),
        alt: 'Ministerio de las Culturas, las Artes y el Patrimonio',
        width: 1080,
        height: 549,
      },
      {
        src: formatPath(`${BRAND.paths.rengifo}/images/logos/laSerena.png`),
        alt: 'Municipio de La Serena',
        width: 1080,
        height: 1080,
      },
      {
        src: formatPath(`${BRAND.paths.rengifo}/images/logos/ULS.png`),
        alt: 'Universidad de La Serena',
        width: 1080,
        height: 549,
      },
      {
        src: formatPath(`${BRAND.paths.rengifo}/images/logos/colArq.png`),
        alt: 'Colegio de Arquitectos de Chile',
        width: 1149,
        height: 549,
      },
      {
        src: formatPath(`${BRAND.paths.rengifo}/images/logos/CEDAU.png`),
        alt: 'CEDAU',
        width: 1080,
        height: 549,
      },
    ],
    developer: {
      text: 'Desarrollado con ♥  por Strocs',
      href: 'https://github.com/Strocs',
    },
  },
} as const
