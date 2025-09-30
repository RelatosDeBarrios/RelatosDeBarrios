import { create } from 'zustand'
import { getNextIndex, getPrevIndex } from '@/utils/circular'

export interface GalleryState<T extends string = string> {
  currentGalleryId: T | null
  currentImageIndex: number
  isGalleryOpen: boolean

  setCurrentGallery: (gallery: T) => void
  setImageIndex: (index: number) => void

  openGallery: (galleryId: T, startIndex?: number) => void
  closeGallery: () => void

  navigation: {
    next: (length: number) => void
    prev: (length: number) => void
    goTo: (index: number) => void
  }
}

export const createGalleryStore = () => {
  return create<GalleryState>((set, get) => ({
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

    navigation: {
      next: (length) => {
        set({ currentImageIndex: getNextIndex(get().currentImageIndex, length) })
      },
      prev: (length) => {
        set({ currentImageIndex: getPrevIndex(get().currentImageIndex, length) })
      },
      goTo: (index) => set({ currentImageIndex: index }),
    },
  }))
}
