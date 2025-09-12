'use client'

import Image from 'next/image'

import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/css'

import type { GalleryItems } from '../types'
import type { ImageType } from '@/types/general'
import { useCrossfadeImages } from '@/app/villacovico/hooks/useCrossfade'
import { VisualArchiveGallery } from './VisualArchiveGallery'

interface VisualArchivePosterProps {
  gallery: Record<GalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 5 // time in seconds

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)

  const currentGalleryId = useVisualArchiveGallery((state) => state.currentGalleryId)
  const currentImageIndex = useVisualArchiveGallery((state) => state.currentImageIndex)

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGallery(currentGalleryId, currentImageIndex)
  }

  const setImage = useVisualArchiveGallery((state) => state.setImage)
  const isGalleryOpen = useVisualArchiveGallery((state) => state.isGalleryOpen)

  const { containerRef, imageA, imageB, imageAIndex, imageBIndex } = useCrossfadeImages({
    durationInSeconds: 1,
    currentIndex: currentImageIndex,
    disabled: hovered || isGalleryOpen,
  })

  // Get images for both buffers
  const currentGallery = gallery[currentGalleryId]
  const imageAData = currentGallery[imageAIndex]
  const imageBData = currentGallery[imageBIndex]

  useEffect(() => {
    if (hovered || isGalleryOpen) return
    const interval = setInterval(() => {
      const galleryLength = gallery[currentGalleryId].length
      setImage((currentImageIndex + 1) % galleryLength)
    }, IMAGE_CHANGE_RATE * 1000)
    return () => clearInterval(interval)
  }, [currentGalleryId, setImage, gallery, hovered, isGalleryOpen, currentImageIndex])

  return (
    <>
      <figure
        ref={containerRef}
        onClick={handleOpenGallery}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className={cn(
          'relative aspect-square cursor-pointer overflow-hidden rounded-xl',
          !isGalleryOpen &&
            'after:from-covico-foreground/75 after:absolute after:inset-0 after:z-0 after:rounded-xl after:bg-gradient-to-b after:to-transparent after:content-[""] group-hover:after:opacity-20'
        )}
      >
        {/* Image Buffer A */}
        <Image
          ref={imageA}
          src={imageAData.src}
          alt={imageAData.alt}
          width={imageAData.width}
          height={imageAData.height}
          loading='lazy'
          className='absolute inset-0 size-full scale-110 object-cover object-center'
        />

        {/* Image Buffer B */}
        <Image
          ref={imageB}
          src={imageBData.src}
          alt={imageBData.alt}
          width={imageBData.width}
          height={imageBData.height}
          loading='lazy'
          className='absolute inset-0 size-full scale-110 object-cover object-center'
        />
      </figure>

      <VisualArchiveGallery />
    </>
  )
}
