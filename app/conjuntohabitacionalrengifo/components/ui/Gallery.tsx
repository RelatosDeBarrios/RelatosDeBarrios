'use client'

import React, { useEffect } from 'react'
import { useGalleryStore, type GalleryImage } from '@/rengifo/store/galleryStore'
import Image from 'next/image'
import { ArrowBigLeft, ArrowBigRight, Minimize2 } from 'lucide-react'
import { cn } from '@/utils/css'
import { getImagesById } from '@/rengifo/utils/galleryUtils'
import { useGallery, type GalleryAdapter } from '@/hooks/useGallery'

export const Gallery = () => {
  const store = useGalleryStore()

  // Create adapter for Rengifo store
  const adapter: GalleryAdapter<GalleryImage> = {
    isOpen: store.isOpen,
    currentIndex: store.currentIndex,
    currentGalleryId: store.currentGalleryId,
    getImages: () => getImagesById(store.currentGalleryId),
    openGallery: store.openGallery,
    closeGallery: store.closeGallery,
    setIndex: store.setIndex,
  }

  const gallery = useGallery(adapter)

  // Trap focus inside modal
  useEffect(() => {
    if (!gallery.isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') gallery.controls.close()
      if (e.key === 'ArrowRight') gallery.navigation.next()
      if (e.key === 'ArrowLeft') gallery.navigation.prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gallery.isOpen, gallery.controls, gallery.navigation])

  if (!gallery.isOpen || gallery.images.length === 0) return null

  // Swipe support (basic)
  let startX = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    if (endX - startX > 50) gallery.navigation.prev()
    if (startX - endX > 50) gallery.navigation.next()
  }

  const currentImage = gallery.currentImage!

  return (
    <div
      role='dialog'
      aria-modal='true'
      tabIndex={-1}
      className='bg-rengifo-azul/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl'
      onClick={gallery.controls.close}
    >
      <div
        className='bg-rengifo-pastel relative mx-4 flex w-full max-w-3xl flex-col items-center rounded-lg shadow-xl'
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          aria-label='Cerrar galería'
          className='text-rengifo-pastel hover:text-rengifo-amarillo absolute top-2 right-2 cursor-pointer text-2xl transition-colors'
          onClick={gallery.controls.close}
        >
          <Minimize2 />
        </button>
        <div className='bg-rengifo-azul-darker flex h-[60vw] max-h-[70vh] w-full items-center justify-center'>
          <button
            aria-label='Previous image'
            className='group absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-3xl'
            onClick={gallery.navigation.prev}
          >
            <ArrowBigLeft
              size={42}
              strokeWidth={1.5}
              className='group-hover:fill-rengifo-amarillo text-rengifo-azul fill-white transition-colors'
            />
          </button>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className='mx-auto max-h-[60vh] object-contain select-none'
            priority
          />
          <button
            aria-label='Next image'
            className='group absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-3xl'
            onClick={gallery.navigation.next}
          >
            <ArrowBigRight
              size={42}
              strokeWidth={1.5}
              className='group-hover:fill-rengifo-amarillo text-rengifo-azul fill-white transition-colors'
            />
          </button>
        </div>
        <div className='flex justify-center gap-2 py-4'>
          {gallery.images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to image ${idx + 1}`}
              className={cn([
                'border-rengifo-gris hover:bg-rengifo-amarillo/50 h-3 w-3 cursor-pointer rounded-full border',
                idx === gallery.currentIndex ? 'bg-rengifo-azul-darker' : 'bg-rengifo-azul/20',
              ])}
              onClick={() => gallery.navigation.goTo(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
