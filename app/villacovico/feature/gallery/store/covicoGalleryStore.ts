import type { StoreApi, UseBoundStore } from 'zustand'
import { createGalleryStore } from '@/hooks/createGalleryStore'

export const useCovicoGallery = createGalleryStore()

export function createCovicoGallery<TGalleryItems extends string = string>() {
  return useCovicoGallery as UseBoundStore<
    StoreApi<{
      currentGalleryId: TGalleryItems | null
      currentImageIndex: number
      isGalleryOpen: boolean
      setCurrentGallery: (galleryId: TGalleryItems) => void
      setImageIndex: (index: number) => void
      openGallery: (galleryId: TGalleryItems, startIndex?: number) => void
      closeGallery: () => void
    }>
  >
}
