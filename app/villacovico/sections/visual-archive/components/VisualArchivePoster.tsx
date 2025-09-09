'use client'

import Image from 'next/image'
import gsap from 'gsap'

import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/css'
import { useGSAP } from '@gsap/react'

import type { GalleryItems } from '../types'
import type { ImageType } from '@/types/general'

gsap.registerPlugin(useGSAP)

interface VisualArchivePosterProps {
  gallery: Record<GalleryItems, ImageType[]>
}

const IMAGE_CHANGE_RATE = 5 // time in seconds
const CROSSFADE_DURATION = 0.5 // time in seconds

export const VisualArchivePoster = ({ gallery }: VisualArchivePosterProps) => {
  const [hovered, setHovered] = useState(false)
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0)

  const containerRef = useRef<HTMLPictureElement>(null)

  const currentGallery = useVisualArchiveGallery(
    (state) => state.currentGallery
  )
  const currentImageIndex = useVisualArchiveGallery(
    (state) => state.currentImageIndex
  )

  const openGallery = useVisualArchiveGallery((state) => state.openGallery)
  const setNextImage = useVisualArchiveGallery((state) => state.setNextImage)

  const currentImage = gallery[currentGallery][displayedImageIndex]
  const targetImage = gallery[currentGallery][currentImageIndex]

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('.current-image', { opacity: 1 })
      gsap.set('.target-image', { opacity: 0 })
    },
    { scope: containerRef }
  )

  const performCrossfade = contextSafe(() => {
    // Fade out current image, fade in target image
    gsap.to('.current-image', { opacity: 0, duration: CROSSFADE_DURATION })
    gsap.to('.target-image', { opacity: 1, duration: CROSSFADE_DURATION })

    setTimeout(() => {
      // After crossfade, update the displayed index and reset for next transition
      setDisplayedImageIndex(currentImageIndex)

      // Reset opacities: current becomes visible, target becomes hidden for next transition
      gsap.set('.current-image', { opacity: 1 })
      gsap.set('.target-image', { opacity: 0 })
    }, CROSSFADE_DURATION * 1000)
  })

  useEffect(() => {
    if (currentImageIndex === displayedImageIndex) return
    performCrossfade()
  }, [currentImageIndex, performCrossfade, displayedImageIndex])

  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      const galleryLength = gallery[currentGallery].length
      setNextImage(galleryLength)
    }, IMAGE_CHANGE_RATE * 1000)
    return () => clearInterval(interval)
  }, [currentGallery, setNextImage, gallery, hovered])

  return (
    <figure
      ref={containerRef}
      onClick={openGallery}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={cn(
        'relative aspect-square cursor-pointer overflow-hidden rounded-xl',
        'after:from-covico-foreground/75 after:absolute after:inset-0 after:z-0 after:rounded-xl after:bg-gradient-to-b after:to-transparent after:content-[""] group-hover:after:opacity-20'
      )}
    >
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        width={currentImage.width}
        height={currentImage.height}
        priority
        loading='eager'
        className={cn(
          'current-image absolute inset-0 size-full scale-110 object-cover object-center'
        )}
      />

      <Image
        src={targetImage.src}
        alt={targetImage.alt}
        width={targetImage.width}
        height={targetImage.height}
        priority
        loading='eager'
        className={cn(
          'target-image absolute inset-0 size-full scale-110 object-cover object-center'
        )}
      />
    </figure>
  )
}
