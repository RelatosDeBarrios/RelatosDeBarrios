import { create } from 'zustand'
import { VisualArchiveGalleryItems } from '../types'

interface VisualArchiveSelectionState {
  activeArchive: VisualArchiveGalleryItems
  setActiveArchive: (activeArchive: string) => void
  resetCrossfade: (() => void) | null
  setResetCrossfade: (reset: () => void) => void
}

export const useVisualArchiveSelection = create<VisualArchiveSelectionState>((set) => ({
  activeArchive: 'photos',
  setActiveArchive: (activeArchive) =>
    set({
      activeArchive: activeArchive as VisualArchiveGalleryItems,
    }),
  resetCrossfade: null,
  setResetCrossfade: (reset) => set({ resetCrossfade: reset }),
}))
