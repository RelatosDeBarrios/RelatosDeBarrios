import { Gallery } from '@/app/villacovico/feature/gallery/gallery'
import { VisualArchiveGalleryItems } from '../types'
import { ImageType } from '@/types/general'
import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'

interface VisualArchiveGalleryProps {
  galleries: Record<VisualArchiveGalleryItems, ImageType[]>
}

export const VisualArchiveGallery = ({ galleries }: VisualArchiveGalleryProps) => {
  const store = useVisualArchiveGallery()

  return <Gallery store={store} galleries={galleries} />
}
