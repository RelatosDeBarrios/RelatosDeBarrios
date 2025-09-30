import { Gallery } from '@/app/villacovico/feature/gallery/gallery'
import { VisualArchiveGalleryItems } from '../types'
import { ImageType } from '@/types/general'

interface VisualArchiveGalleryProps {
  galleries: Record<VisualArchiveGalleryItems, ImageType[]>
}

export const VisualArchiveGallery = ({ galleries }: VisualArchiveGalleryProps) => {
  return <Gallery galleries={galleries} />
}
