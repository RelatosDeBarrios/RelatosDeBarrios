'use client'

import Image from 'next/image'

import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/css'

import type { GalleryItems } from '../types'
import type { ImageType } from '@/types/general'
import { useCrossfade } from '@/app/villacovico/hooks/useCrossfade'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { VisualArchiveGallery } from './VisualArchiveGallery'

gsap.registerPlugin(useGSAP)

interface VisualArchivePosterProps {
  gallery: Record<GalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 5 // time in seconds

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)

  const currentGalleryId = useVisualArchiveGallery((state) => state.currentGalleryId)
  const currentImageIndex = useVisualArchiveGallery((state) => state.currentImageIndex)

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)
  const setNextImage = useVisualArchiveGallery((state) => state.setNextImage)
  const isGalleryOpen = useVisualArchiveGallery((state) => state.isGalleryOpen)

  const { containerRef, currentImageRef, nextImageRef, currentIndex, nextIndex } = useCrossfade({
    durationInSeconds: 0.5,
    currentIndex: currentImageIndex,
    disabled: hovered || isGalleryOpen,
  })

  useGSAP(
    () => {
      const initialPos = currentImageRef.current?.getBoundingClientRect()
      if (!initialPos) return
      console.log('initialPos', initialPos)

      if (isGalleryOpen) {
        gsap.to(currentImageRef.current, {
          x: 100,
          y: 100,
          z: 100,
          duration: 0.5,
          ease: 'power2.out',
        })
      } else {
        gsap.to(currentImageRef.current, {
          x: initialPos.x,
          y: initialPos.y,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    },
    { scope: containerRef, dependencies: [isGalleryOpen] }
  )

  const currentImage = gallery[currentGalleryId][currentIndex]
  const nextImage = gallery[currentGalleryId][nextIndex]

  useEffect(() => {
    if (hovered || isGalleryOpen) return
    const interval = setInterval(() => {
      const galleryLength = gallery[currentGalleryId].length
      setNextImage(galleryLength)
    }, IMAGE_CHANGE_RATE * 1000)
    return () => clearInterval(interval)
  }, [currentGalleryId, setNextImage, gallery, hovered, isGalleryOpen])

  return (
    <>
      <figure
        ref={containerRef}
        onClick={openGallery}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className={cn(
          'relative aspect-square cursor-pointer overflow-hidden rounded-xl',
          !isGalleryOpen &&
            'after:from-covico-foreground/75 after:absolute after:inset-0 after:z-0 after:rounded-xl after:bg-gradient-to-b after:to-transparent after:content-[""] group-hover:after:opacity-20'
        )}
      >
        <Image
          ref={currentImageRef}
          src={currentImage.src}
          alt={currentImage.alt}
          width={currentImage.width}
          height={currentImage.height}
          priority
          loading='eager'
          className={cn(
            'absolute inset-0 size-full scale-110 object-cover object-center',
            isGalleryOpen && 'right-0 left-0 z-50'
          )}
        />

        <Image
          ref={nextImageRef}
          src={nextImage.src}
          alt={nextImage.alt}
          width={nextImage.width}
          height={nextImage.height}
          priority
          loading='eager'
          className={cn(
            'absolute inset-0 size-full scale-110 object-cover object-center',
            isGalleryOpen && 'opacity-0'
          )}
        />
      </figure>

      <VisualArchiveGallery gallery={gallery[currentGalleryId]} />
    </>
  )
}
