import { BRAND } from '@/content/brand'
import { ResourcesContent } from '@/rengifo/types/content'
import { formatPath } from '@/utils/format'

export const resourcesContent: ResourcesContent = {
  id: 'resources',
  title: 'Descubre',
  subTitle: 'Relatos de Barrios',
  cards: {
    book: {
      id: 'book',
      title: 'Libro',
      subTitle: 'Descárgalo Aquí',
      href: `/Libro_RelatosDeBarrios.pdf`,

      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/ventana1.png`),
        width: 300,
        height: 300,
        alt: 'Portada del libro documental Rengifo',
      },
    },
    documentary: {
      id: 'documentary',
      title: 'Documental',
      subTitle: 'Míralo Aquí',
      href: 'https://www.youtube.com/embed/6Vg9ZTJFnj4?fs=1',
      bg: {
        src: formatPath(`${BRAND.paths.rengifo}/images/ventana2.png`),
        width: 300,
        height: 300,
        alt: 'Portada del libro documental Rengifo 2',
      },
    },
  },
}
