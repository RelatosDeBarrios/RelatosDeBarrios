import { create } from 'zustand'
import { GalleryState } from '../types'

export const useCovicoGallery = create<GalleryState>((set) => ({
  currentGalleryId: null,
  currentImageIndex: 0,
  isGalleryOpen: false,
  setCurrentGallery: (gallery) => set({ currentGalleryId: gallery, currentImageIndex: 0 }),
  setImageIndex: (index) => set({ currentImageIndex: index }),
  openGallery: (galleryId, startIndex = 0) =>
    set({
      isGalleryOpen: true,
      currentGalleryId: galleryId,
      currentImageIndex: startIndex,
    }),
  closeGallery: () => set({ isGalleryOpen: false }),
}))
