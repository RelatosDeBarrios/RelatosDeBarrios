'use client'

import React, { useEffect } from 'react'
import { useGalleryStore } from '@/rengifo/store/galleryStore'
import Image from 'next/image'
import { ArrowBigLeft, ArrowBigRight, Minimize2 } from 'lucide-react'
import { cn } from '@/utils/css'

export const Gallery = () => {
  const { isOpen, images, currentIndex, closeGallery, next, prev, goTo } = useGalleryStore()

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGallery()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, closeGallery, next, prev])

  if (!isOpen || images.length === 0) return null

  // Swipe support (basic)
  let startX = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    if (endX - startX > 50) prev()
    if (startX - endX > 50) next()
  }

  return (
    <div
      role='dialog'
      aria-modal='true'
      tabIndex={-1}
      className='bg-rengifo-azul/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl'
      onClick={closeGallery}
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
          onClick={closeGallery}
        >
          <Minimize2 />
        </button>
        <div className='bg-rengifo-azul-darker flex h-[60vw] max-h-[70vh] w-full items-center justify-center'>
          <button
            aria-label='Previous image'
            className='group absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-3xl'
            onClick={prev}
          >
            <ArrowBigLeft
              size={42}
              strokeWidth={1.5}
              className='group-hover:fill-rengifo-amarillo text-rengifo-azul fill-white transition-colors'
            />
          </button>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={images[currentIndex].width}
            height={images[currentIndex].height}
            className='mx-auto max-h-[60vh] object-contain select-none'
            priority
          />
          <button
            aria-label='Next image'
            className='group absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-3xl'
            onClick={next}
          >
            <ArrowBigRight
              size={42}
              strokeWidth={1.5}
              className='group-hover:fill-rengifo-amarillo text-rengifo-azul fill-white transition-colors'
            />
          </button>
        </div>
        <div className='flex justify-center gap-2 py-4'>
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to image ${idx + 1}`}
              className={cn([
                'border-rengifo-gris hover:bg-rengifo-amarillo/50 h-3 w-3 cursor-pointer rounded-full border',
                idx === currentIndex ? 'bg-rengifo-azul-darker' : 'bg-rengifo-azul/20',
              ])}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
