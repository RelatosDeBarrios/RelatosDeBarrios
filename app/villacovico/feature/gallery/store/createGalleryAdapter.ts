import type { StoreApi, UseBoundStore } from 'zustand'
import { GalleryState } from '../types'

export function createGalleryAdapter<TGalleryItems extends string>(
  store: UseBoundStore<StoreApi<GalleryState>>
) {
  return store as UseBoundStore<
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
