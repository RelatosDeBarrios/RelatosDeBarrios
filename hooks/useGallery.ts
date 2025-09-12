import { getNextIndex, getPrevIndex } from '@/utils/circular'
import { ImageType } from '@/types/general'

/**
 * Gallery adapter interface - each store implementation provides this
 */
export interface GalleryAdapter<T extends ImageType> {
  // State
  isOpen: boolean
  currentIndex: number
  currentGalleryId: string

  // Data fetcher - gets images for current gallery
  getImages: () => T[]

  // Actions
  openGallery: (galleryId: string, startIndex?: number) => void
  closeGallery: () => void
  setIndex: (index: number) => void
}

/**
 * Unified gallery interface returned by the hook
 */
export interface GalleryInterface<T extends ImageType> {
  // State
  isOpen: boolean
  currentIndex: number
  currentGalleryId: string
  images: T[]
  currentImage: T | undefined

  // Navigation
  navigation: {
    next: () => void
    prev: () => void
    goTo: (index: number) => void
  }

  // Controls
  controls: {
    open: (galleryId: string, startIndex?: number) => void
    close: () => void
  }
}

/**
 * Gallery abstraction hook
 * Provides unified interface for different gallery store implementations
 */
export function useGallery<T extends ImageType>(adapter: GalleryAdapter<T>): GalleryInterface<T> {
  const images = adapter.getImages()

  const navigation = {
    next: () => {
      if (images.length > 0) {
        const nextIndex = getNextIndex(adapter.currentIndex, images.length)
        adapter.setIndex(nextIndex)
      }
    },
    prev: () => {
      if (images.length > 0) {
        const prevIndex = getPrevIndex(adapter.currentIndex, images.length)
        adapter.setIndex(prevIndex)
      }
    },
    goTo: (index: number) => {
      if (index >= 0 && index < images.length) {
        adapter.setIndex(index)
      }
    },
  }

  const controls = {
    open: (galleryId: string, startIndex = 0) => {
      adapter.openGallery(galleryId, startIndex)
    },
    close: () => {
      adapter.closeGallery()
    },
  }

  return {
    isOpen: adapter.isOpen,
    currentIndex: adapter.currentIndex,
    currentGalleryId: adapter.currentGalleryId,
    images,
    currentImage: images[adapter.currentIndex],
    navigation,
    controls,
  }
}
