'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'
import { cn } from '@/utils/css'

import type { ImageType } from '@/types/general'
import { useCrossfadeImages } from '@/app/villacovico/hooks/useCrossfade'
import { VisualArchiveGallery } from './VisualArchiveGallery'
import { VisualArchiveGalleryItems } from '../types'
import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'

interface VisualArchivePosterProps {
  gallery: Record<VisualArchiveGalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 5 // time in seconds
const DEFAULT_GALLERY: VisualArchiveGalleryItems = 'photos'

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)

  const setCurrentGallery = useVisualArchiveGallery((state) => state.setCurrentGallery)

  useEffect(() => {
    setCurrentGallery(DEFAULT_GALLERY)
  }, [setCurrentGallery])

  // Get current gallery and image index from the store
  const currentGalleryId =
    useVisualArchiveGallery((state) => state.currentGalleryId) ?? DEFAULT_GALLERY
  const currentImageIndex = useVisualArchiveGallery((state) => state.currentImageIndex)

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGallery(currentGalleryId, currentImageIndex)
  }

  const setImage = useVisualArchiveGallery((state) => state.setImageIndex)
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

      <VisualArchiveGallery galleries={gallery} />
    </>
  )
}
