import { ImageType } from '@/types/general'
import { PlanType } from '../types'
import { Gallery } from '@/covico/features/gallery/gallery'

interface PlansGalleryProps {
  galleries: Record<PlanType, ImageType[]>
}
export function PlansGallery({ galleries }: PlansGalleryProps) {
  return <Gallery galleries={galleries} />
}
