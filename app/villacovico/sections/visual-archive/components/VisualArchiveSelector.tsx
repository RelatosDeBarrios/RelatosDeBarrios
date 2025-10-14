'use client'

import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'
import { useVisualArchiveSelection } from '../hooks/useVisualArchiveSelection'
import { VisualArchiveGalleryItems } from '../types'
import { VisualArchiveSelectorCheckbox } from './VisualArchiveSelectorCheckbox'

interface VisualArchiveSelectorProps {
  id: VisualArchiveGalleryItems
  archiveTitle: string
}

export const VisualArchiveSelector = ({ id, archiveTitle }: VisualArchiveSelectorProps) => {
  const currentArchive = useVisualArchiveSelection((state) => state.activeArchive)
  const setActiveArchive = useVisualArchiveSelection((state) => state.setActiveArchive)
  const resetCrossfade = useVisualArchiveSelection((state) => state.resetCrossfade)
  const setGalleryIndex = useVisualArchiveGallery((state) => state.setImageIndex)

  const handleChangeGallery = (e: React.MouseEvent, id: VisualArchiveGalleryItems) => {
    e.stopPropagation()
    setGalleryIndex(0)
    resetCrossfade?.()
    setActiveArchive(id)
  }

  return (
    <button
      type='button'
      onClick={(evt) => handleChangeGallery(evt, id)}
      className='text-covico-background justift-end group flex cursor-pointer items-end gap-2 md:gap-4'
    >
      <span className='font-montserrat text-right text-lg leading-none font-extralight tracking-wider whitespace-nowrap md:text-2xl'>
        {archiveTitle}
      </span>
      <VisualArchiveSelectorCheckbox id={id} selected={currentArchive === id} />
    </button>
  )
}
