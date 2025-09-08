'use client'

import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'

export const VisualArchiveOpenGalleryBtn = () => {
  const openGallery = useVisualArchiveGallery((state) => state.openGallery)

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGallery()
  }

  return (
    <button
      onClick={handleOpenGallery}
      className='bg-covico-foreground hover:bg-covico-red text-covico-background absolute right-8 bottom-8 cursor-pointer rounded-md px-6 py-2 text-xl transition-colors duration-300'
    >
      Abrir Galería
    </button>
  )
}
