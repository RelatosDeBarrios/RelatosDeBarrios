import { VISUAL_ARCHIVE } from '../content'
import { GalleryItems } from '../types'
import { ImageType } from '@/types/general'

/**
 * Get images by gallery ID for Villa Cóvico Visual Archive
 * @param galleryId - The gallery identifier
 * @returns Array of images for the specified gallery
 */
export function getGalleryImages(galleryId: GalleryItems): ImageType[] {
  const gallery = VISUAL_ARCHIVE.cards[galleryId]
  return gallery?.gallery || []
}
