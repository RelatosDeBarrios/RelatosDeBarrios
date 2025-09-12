import { create } from 'zustand'
import { GalleryItems } from '../types'

interface VisualArchiveGalleryState {
  currentGalleryId: GalleryItems
  currentImageIndex: number
  isGalleryOpen?: boolean
  setCurrentGallery: (gallery: GalleryItems) => void
  setImage: (index: number) => void
  openGallery: (galleryId: GalleryItems, startIndex?: number) => void
  closeGallery: () => void
}

export const useVisualArchiveGallery = create<VisualArchiveGalleryState>((set) => ({
  currentGalleryId: 'photos',
  currentImageIndex: 0,
  isGalleryOpen: false,
  setCurrentGallery: (gallery) => set({ currentGalleryId: gallery, currentImageIndex: 0 }),
  setImage: (index) => set({ currentImageIndex: index }),
  openGallery: (galleryId, startIndex = 0) =>
    set({
      isGalleryOpen: true,
      currentGalleryId: galleryId,
      currentImageIndex: startIndex,
    }),
  closeGallery: () => set({ isGalleryOpen: false }),
}))
