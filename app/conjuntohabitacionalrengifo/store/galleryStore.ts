import { create } from 'zustand'

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface GalleryState {
  isOpen: boolean
  images: GalleryImage[]
  currentIndex: number
  originId: string | null
  openGallery: (images: GalleryImage[], startIndex: number, originId: string) => void
  closeGallery: () => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const useGalleryStore = create<GalleryState>((set) => ({
  isOpen: false,
  images: [],
  currentIndex: 0,
  originId: null,
  openGallery: (images, startIndex, originId) => set({ isOpen: true, images, currentIndex: startIndex, originId }),
  closeGallery: () => set({ isOpen: false, images: [], currentIndex: 0, originId: null }),
  next: () =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % state.images.length,
    })),
  prev: () =>
    set((state) => ({
      currentIndex: (state.currentIndex - 1 + state.images.length) % state.images.length,
    })),
  goTo: (index) => set({ currentIndex: index }),
}))
