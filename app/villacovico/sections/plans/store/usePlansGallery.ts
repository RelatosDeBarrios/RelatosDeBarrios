import { createCovicoGallery } from '@/covico/features/gallery/store/covicoGalleryStore'
import { PlanType } from '../types'

export const usePlansGallery = createCovicoGallery<PlanType>()
