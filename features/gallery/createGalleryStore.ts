import { create } from 'zustand'
import { getNextIndex, getPrevIndex } from '@/utils/circular'

interface GalleryState<T extends string = string> {
  currentGalleryId: T | null
  currentImageIndex: number
  isGalleryOpen: boolean
}

export interface GalleryStore<T extends string = string> extends GalleryState<T> {
  setImageIndex: (index: number) => void

  openGallery: (galleryId: T, startIndex?: number) => void
  closeGallery: () => void

  navigation: {
    next: (length: number) => void
    prev: (length: number) => void
    goTo: (index: number) => void
  }
}

const initialState: GalleryState = {
  currentGalleryId: null,
  currentImageIndex: 0,
  isGalleryOpen: false,
}

/**
 * Factory function that creates a reusable gallery store
 *
 * This factory implements the base gallery logic that can be instantiated
 * per page, allowing each page to have its own singleton store instance.
 *
 * @returns Zustand store with gallery state and actions
 *
 * @example
 * // Create a page-specific gallery store
 * export const useCovicoGallery = createGalleryStore()
 */
export const createGalleryStore = () => {
  return create<GalleryStore>((set, get) => ({
    currentGalleryId: initialState.currentGalleryId,
    currentImageIndex: initialState.currentImageIndex,
    isGalleryOpen: initialState.isGalleryOpen,

    setImageIndex: (index) => set({ currentImageIndex: index }),
    openGallery: (galleryId, startIndex = 0) =>
      set({
        isGalleryOpen: true,
        currentGalleryId: galleryId,
        currentImageIndex: startIndex,
      }),
    closeGallery: () => set({ isGalleryOpen: false, currentGalleryId: null }),

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
