import { createCovicoGallery } from '@/app/villacovico/feature/gallery/store/covicoGalleryStore'
import type { VisualArchiveGalleryItems } from '../types'

export const useVisualArchiveGallery = createCovicoGallery<VisualArchiveGalleryItems>()
