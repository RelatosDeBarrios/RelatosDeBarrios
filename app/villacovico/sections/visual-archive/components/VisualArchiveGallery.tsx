'use client'
import { useEffect } from 'react'
import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { ImageType } from '@/types/general'
import { GalleryItems } from '../types'

interface VisualArchiveGalleryProps {
  gallery: Record<GalleryItems, ImageType[]>
}

export const VisualArchiveGallery = ({ gallery }: VisualArchiveGalleryProps) => {
  const isGalleryOpen = useVisualArchiveGallery((state) => state.isGalleryOpen)
  const closeGallery = useVisualArchiveGallery((state) => state.closeGallery)

  const currentGalleryId = useVisualArchiveGallery((state) => state.currentGalleryId)
  const currentImageIndex = useVisualArchiveGallery((state) => state.currentImageIndex)

  const currentGallery = gallery[currentGalleryId]
  const currentImage = currentGallery[currentImageIndex]

  console.log(currentImage)

  useEffect(() => {
    // Prevent background scrolling when gallery is open
    document.body.style.overflow = isGalleryOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  })

  if (!isGalleryOpen) return null

  return createPortal(
    <div className='bg-covico-foreground/98 fixed inset-0'>
      <button onClick={closeGallery} className='text-covico-background absolute top-4 right-4'>
        <X size={40} />
      </button>
    </div>,
    document.body
  )
}
