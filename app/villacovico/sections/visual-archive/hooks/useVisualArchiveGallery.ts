import { createGalleryAdapter } from '@/covico/feature/gallery/store/createGalleryAdapter'
import { useCovicoGallery } from '@/covico/feature/gallery/store/CovicoGalleryStore'
import type { VisualArchiveGalleryItems } from '../types'

export const useVisualArchiveGallery =
  createGalleryAdapter<VisualArchiveGalleryItems>(useCovicoGallery)
