import { createCovicoGallery } from '@/covico/features/gallery/store/covicoGalleryStore'
import type { VisualArchiveGalleryItems } from '../types'

export const useVisualArchiveGallery = createCovicoGallery<VisualArchiveGalleryItems>()
