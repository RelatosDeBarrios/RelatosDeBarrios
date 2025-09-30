import { useCovicoGallery } from '@/app/villacovico/feature/gallery/store/CovicoGalleryStore'
import { createGalleryAdapter } from '@/app/villacovico/feature/gallery/store/createGalleryAdapter'
import { PlanType } from '../types'

export const usePlansGallery = createGalleryAdapter<PlanType>(useCovicoGallery)
