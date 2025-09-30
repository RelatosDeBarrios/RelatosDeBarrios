import type { StoreApi, UseBoundStore } from 'zustand'
import { createGalleryStore } from '@/features/gallery/createGalleryStore'

/**
 * Singleton gallery store instance for Villa Covico page
 *
 * This is the ONE store instance shared across all gallery sections
 * (visual-archive, plans, etc.) on the Villa Covico page.
 */
export const useCovicoGallery = createGalleryStore()

/**
 * Type factory for section-specific gallery hooks
 *
 * Creates type-safe wrappers that point to the same singleton store
 * but provide autocomplete for section-specific gallery IDs.
 *
 * This is a compile-time only cast with zero runtime overhead.
 * All section hooks share the SAME store instance.
 *
 * @template TGalleryItems - Union type of gallery IDs for the section
 * @returns Typed store hook with section-specific gallery IDs
 *
 * @example
 * // Section
 * type SectionGalleryItems = 'gallery1-id' | 'gallery2-id'
 * export const useSectionGallery =
 *   createCovicoGallery<SectionGalleryItems>()
 *
 * // Every section hooks point to the SAME store instance
 */
export function createCovicoGallery<TGalleryItems extends string = string>() {
  return useCovicoGallery as UseBoundStore<
    StoreApi<{
      currentGalleryId: TGalleryItems | null
      currentImageIndex: number
      isGalleryOpen: boolean
      setCurrentGallery: (galleryId: TGalleryItems) => void
      setImageIndex: (index: number) => void
      openGallery: (galleryId: TGalleryItems, startIndex?: number) => void
      closeGallery: () => void
    }>
  >
}
