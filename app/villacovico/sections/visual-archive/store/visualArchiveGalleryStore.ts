import { create } from 'zustand'
import { GalleryItems } from '../types'

interface VisualArchiveGalleryState {
  currentGallery: GalleryItems
  currentImageIndex: number
  isGalleryOpen?: boolean
  setCurrentGallery: (gallery: GalleryItems) => void
  setImage: (index: number) => void
  nextImage: (galleryLength: number) => void
  prevImage: (galleryLength: number) => void
  openGallery: () => void
  closeGallery: () => void
}

export const useVisualArchiveGallery = create<VisualArchiveGalleryState>(
  (set) => ({
    currentGallery: 'photos',
    currentImageIndex: 0,
    isGalleryOpen: false,
    setCurrentGallery: (gallery) =>
      set({ currentGallery: gallery, currentImageIndex: 0 }),
    setImage: (index) => set({ currentImageIndex: index }),
    nextImage: (galleryLength) =>
      set((state) => ({
        currentImageIndex:
          state.currentImageIndex === galleryLength - 1
            ? 0
            : state.currentImageIndex + 1,
      })),
    prevImage: (galleryLength) =>
      set((state) => ({
        currentImageIndex:
          state.currentImageIndex === 0
            ? galleryLength - 1
            : state.currentImageIndex - 1,
      })),
    openGallery: () => set({ isGalleryOpen: true }),
    closeGallery: () => set({ isGalleryOpen: false }),
  })
)
