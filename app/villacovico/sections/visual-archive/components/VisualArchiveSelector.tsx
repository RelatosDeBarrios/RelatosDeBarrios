'use client'

import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { GalleryItems } from '../types'

interface VisualArchiveSelectorProps {
  id: GalleryItems
  archiveTitle: string
}

export const VisualArchiveSelector = ({
  id,
  archiveTitle,
}: VisualArchiveSelectorProps) => {
  const setCurrentGallery = useVisualArchiveGallery(
    (state) => state.setCurrentGallery
  )

  const handleChangeGallery = (e: React.MouseEvent, id: GalleryItems) => {
    e.stopPropagation()
    setCurrentGallery(id)
  }

  return (
    <button
      onClick={(evt) => handleChangeGallery(evt, id)}
      className='text-covico-background block text-right'
    >
      {archiveTitle}
    </button>
  )
}
