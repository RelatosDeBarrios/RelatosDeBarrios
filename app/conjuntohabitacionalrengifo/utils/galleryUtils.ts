import { photosContent } from '../content/photos'
import { docsContent } from '../content/docs'
import { GalleryImage } from '@/types/general'

/**
 * Content sources to search for gallery collections
 */
const CONTENT_SOURCES = [docsContent, photosContent]

/**
 * Searches for a gallery collection by ID across all content sources
 * @param id - The unique identifier for the gallery collection
 * @returns Array of gallery images or empty array if not found
 */
export function getImagesById(id: string): GalleryImage[] {
  if (!id) return []

  for (const source of CONTENT_SOURCES) {
    if (!source.gallery) continue

    const collection = Object.values(source.gallery).find((collection) => collection.id === id)

    if (collection) {
      return collection.images
    }
  }

  return []
}
