import { createCovicoGallery } from '@/app/villacovico/feature/gallery/store/covicoGalleryStore'
import { PlanType } from '../types'

export const usePlansGallery = createCovicoGallery<PlanType>()
