import { CovicoSection } from '@/app/villacovico/types'
import { Card, ImageType } from '@/types/general'

export type GalleryItems = 'photos' | 'aerial-images' | 'illustrations'

export type VisualArchiveCard = Omit<Card<GalleryItems>, 'bg'> & {
  gallery: ImageType[]
}

export type VisualArchive = CovicoSection & {
  cards: Record<GalleryItems, VisualArchiveCard>
}
