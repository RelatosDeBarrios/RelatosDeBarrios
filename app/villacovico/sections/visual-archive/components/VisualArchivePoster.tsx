'use client'

import Image from 'next/image'

import { useState } from 'react'
import { cn } from '@/utils/css'

import type { ImageType } from '@/types/general'
import { useVisualArchiveCrossfade } from '@/app/villacovico/sections/visual-archive/hooks/useVisualArchiveCrossfade'
import { VisualArchiveGallery } from './VisualArchiveGallery'
import { VisualArchiveGalleryItems } from '../types'
import { useVisualArchiveGallery } from '../hooks/useVisualArchiveGallery'
import { useVisualArchiveSelection } from '../hooks/useVisualArchiveSelection'

interface VisualArchivePosterProps {
  gallery: Record<VisualArchiveGalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 5 // time in seconds

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)

  // Get current gallery and image index from the store
  const currentArchive = useVisualArchiveSelection((state) => state.activeArchive)
  const currentGallery = gallery[currentArchive]

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)
  const isGalleryOpen = useVisualArchiveGallery((state) => state.isGalleryOpen)

  const { containerRef, imageA, imageB, imageAIndex, imageBIndex } = useVisualArchiveCrossfade({
    crossfadeDuration: 1,
    intervalDuration: IMAGE_CHANGE_RATE,
    listLength: currentGallery.length - 1,
    disabled: hovered || isGalleryOpen,
  })

  const handleOpenGallery = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGallery(currentArchive, imageAIndex)
  }

  // Get images for both buffers
  const imageAData = currentGallery[imageAIndex]
  const imageBData = currentGallery[imageBIndex]

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
