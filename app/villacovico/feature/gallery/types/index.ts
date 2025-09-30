export interface GalleryState<T extends string = string> {
  currentGalleryId: T | null
  currentImageIndex: number
  isGalleryOpen: boolean
  setCurrentGallery: (gallery: T) => void
  setImageIndex: (index: number) => void
  openGallery: (galleryId: T, startIndex?: number) => void
  closeGallery: () => void
}
