import { create } from 'zustand'
import { GalleryItems } from '../types'
import { getNextIndex, getPrevIndex } from '../utils'

interface VisualArchiveGalleryState {
  currentGalleryId: GalleryItems
  currentImageIndex: number
  isGalleryOpen?: boolean
  setCurrentGallery: (gallery: GalleryItems) => void
  setImage: (index: number) => void
  setNextImage: (galleryLength: number) => void
  setPrevImage: (galleryLength: number) => void
  openGallery: () => void
  closeGallery: () => void
}

export const useVisualArchiveGallery = create<VisualArchiveGalleryState>((set) => ({
  currentGalleryId: 'photos',
  currentImageIndex: 0,
  isGalleryOpen: false,
  setCurrentGallery: (gallery) => set({ currentGalleryId: gallery, currentImageIndex: 0 }),
  setImage: (index) => set({ currentImageIndex: index }),
  setNextImage: (galleryLength) =>
    set((state) => ({
      currentImageIndex: getNextIndex(state.currentImageIndex, galleryLength),
    })),
  setPrevImage: (galleryLength) =>
    set((state) => ({
      currentImageIndex: getPrevIndex(state.currentImageIndex, galleryLength),
    })),
  openGallery: () => set({ isGalleryOpen: true }),
  closeGallery: () => set({ isGalleryOpen: false }),
}))
