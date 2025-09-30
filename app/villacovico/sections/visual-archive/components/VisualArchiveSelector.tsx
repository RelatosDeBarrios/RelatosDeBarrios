'use client'

import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'
import { VisualArchiveGalleryItems } from '../types'
import { VisualArchiveSelectorCheckbox } from './VisualArchiveSelectorCheckbox'

interface VisualArchiveSelectorProps {
  id: VisualArchiveGalleryItems
  archiveTitle: string
}

export const VisualArchiveSelector = ({ id, archiveTitle }: VisualArchiveSelectorProps) => {
  const currentGalleryId = useVisualArchiveGallery((state) => state.currentGalleryId)

  const setCurrentGallery = useVisualArchiveGallery((state) => state.setCurrentGallery)

  const handleChangeGallery = (e: React.MouseEvent, id: VisualArchiveGalleryItems) => {
    e.stopPropagation()
    setCurrentGallery(id)
  }

  return (
    <button
      type='button'
      onClick={(evt) => handleChangeGallery(evt, id)}
      className='text-covico-background justift-end group flex cursor-pointer items-end gap-4'
    >
      <span className='font-montserrat text-right text-2xl leading-none font-extralight tracking-wider whitespace-nowrap'>
        {archiveTitle}
      </span>
      <VisualArchiveSelectorCheckbox id={id} selected={currentGalleryId === id} />
    </button>
  )
}
