import { create } from 'zustand'

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface GalleryState {
  isOpen: boolean
  currentGalleryId: string
  currentIndex: number
  openGallery: (galleryId: string, startIndex?: number) => void
  closeGallery: () => void
  setIndex: (index: number) => void
}

export const useGalleryStore = create<GalleryState>((set) => ({
  isOpen: false,
  currentGalleryId: '',
  currentIndex: 0,
  openGallery: (galleryId, startIndex = 0) =>
    set({
      isOpen: true,
      currentGalleryId: galleryId,
      currentIndex: startIndex,
    }),
  closeGallery: () =>
    set({
      isOpen: false,
      currentGalleryId: '',
      currentIndex: 0,
    }),
  setIndex: (index) => set({ currentIndex: index }),
}))
