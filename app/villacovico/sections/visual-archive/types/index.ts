import { CovicoSection } from '@/app/villacovico/types'
import { Card, ImageType } from '@/types/general'

export type VisualArchiveGalleryItems = 'photos' | 'aerial-images' | 'illustrations'

export type VisualArchiveCard = Omit<Card<VisualArchiveGalleryItems>, 'bg'> & {
  gallery: ImageType[]
}

export type VisualArchive = CovicoSection & {
  cards: Record<VisualArchiveGalleryItems, VisualArchiveCard>
}
