import { ImageType } from '@/types/general'

interface GetGalleryImagesProps {
  galleries: {
    [key: string]: ImageType[]
  }
  id: string | null
}

/**
 * Get images by gallery ID for Villa Cóvico Visual Archive
 * @param id - The gallery identifier
 * @param galleries - The complete section gallery
 * @returns Array of images for the specified gallery
 */

export function getGalleryImages({ galleries, id }: GetGalleryImagesProps): ImageType[] {
  if (!id) return []
  return galleries[id] || []
}
