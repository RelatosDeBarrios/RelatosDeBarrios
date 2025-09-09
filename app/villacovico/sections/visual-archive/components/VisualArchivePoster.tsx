'use client'
import { ImageType } from '@/types/general'
import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { GalleryItems } from '../types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/css'

interface VisualArchivePosterProps {
  gallery: Record<GalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 10 // time in seconds

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)

  const currentGallery = useVisualArchiveGallery(
    (state) => state.currentGallery
  )
  const currentImageIndex = useVisualArchiveGallery(
    (state) => state.currentImageIndex
  )

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)

  const nextImage = useVisualArchiveGallery((state) => state.nextImage)

  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      const galleryLength = gallery[currentGallery].length
      nextImage(galleryLength)
    }, IMAGE_CHANGE_RATE * 1000)
    return () => clearInterval(interval)
  }, [currentGallery, nextImage, gallery, hovered])

  const currentImage = gallery[currentGallery][currentImageIndex]

  return (
    <figure
      onClick={openGallery}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={cn(
        'aspect-square cursor-pointer overflow-hidden rounded-xl',
        'after:from-covico-foreground/75 after:absolute after:inset-0 after:z-0 after:rounded-xl after:bg-gradient-to-b after:to-transparent after:content-[""] group-hover:after:opacity-20'
      )}
    >
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        width={currentImage.width}
        height={currentImage.height}
        className='size-full scale-110 object-cover object-center'
      />
    </figure>
  )
}
