'use client'

import { Button } from '@/app/villacovico/components/ui/Button'
import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'
import { useVisualArchiveSelection } from '../hooks/useVisualArchiveSelection'

export const VisualArchiveOpenGalleryBtn = () => {
  const currentArchive = useVisualArchiveSelection((state) => state.activeArchive)
  const openGallery = useVisualArchiveGallery((state) => state.openGallery)

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGallery(currentArchive)
  }

  return (
    <Button onClick={handleOpenGallery} className='absolute right-8 bottom-8'>
      Abrir Galería
    </Button>
  )
}
