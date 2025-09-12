'use client'
import { useEffect, useRef } from 'react'
import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { ImageType } from '@/types/general'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useGallery, type GalleryAdapter } from '@/hooks/useGallery'
import { getGalleryImages } from '../utils/galleryUtils'
import { GalleryItems } from '../types'

// Register GSAP plugin
gsap.registerPlugin(useGSAP)

interface GalleryImageProps {
  image: ImageType
  className?: string
  onClick?: () => void
  isClickable?: boolean
}

// Reusable image component
const GalleryImage = ({
  image,
  className = '',
  onClick,
  isClickable = false,
}: GalleryImageProps) => {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`${className} ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    />
  )
}

// Navigation component with clickable prev/next images
const GalleryNavigation = ({
  gallery,
  currentIndex,
  onPrevious,
  onNext,
  children,
}: {
  gallery: ImageType[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  children: React.ReactNode
}) => {
  const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length
  const nextIndex = (currentIndex + 1) % gallery.length

  return (
    <>
      {/* Previous Image - Hidden on mobile */}
      <div className='hidden items-center justify-center md:flex'>
        <GalleryImage
          image={gallery[prevIndex]}
          className='max-h-48 object-cover opacity-50 transition-opacity duration-300 hover:opacity-80'
          onClick={onPrevious}
          isClickable
        />
      </div>
      {children}

      {/* Next Image - Hidden on mobile */}
      <div className='hidden items-center justify-center md:flex'>
        <GalleryImage
          image={gallery[nextIndex]}
          className='max-h-48 object-cover opacity-50 transition-opacity duration-300 hover:opacity-80'
          onClick={onNext}
          isClickable
        />
      </div>
    </>
  )
}

// Main view component with central image
const GalleryMainView = ({
  gallery,
  currentIndex,
  onPrevious,
  onNext,
}: {
  gallery: ImageType[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}) => {
  const mainImageRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (mainImageRef.current) {
      gsap.fromTo(mainImageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    }
  }, [currentIndex])

  return (
    <div className='grid min-h-[80vh] grid-cols-1 items-center justify-items-center gap-4 px-4 md:grid-cols-4'>
      <GalleryNavigation
        gallery={gallery}
        currentIndex={currentIndex}
        onPrevious={onPrevious}
        onNext={onNext}
      >
        {/* Central Main Image */}
        <div className='col-span-2 flex items-center justify-center'>
          <Image
            ref={mainImageRef}
            src={gallery[currentIndex].src}
            alt={gallery[currentIndex].alt}
            width={gallery[currentIndex].width}
            height={gallery[currentIndex].height}
            className='max-h-[80vh] w-auto object-contain'
          />
        </div>
      </GalleryNavigation>
    </div>
  )
}

// Preview thumbnails component
const GalleryPreview = ({
  gallery,
  currentIndex,
  onImageSelect,
}: {
  gallery: ImageType[]
  currentIndex: number
  onImageSelect: (index: number) => void
}) => {
  return (
    <div className='flex justify-center gap-2 overflow-x-hidden p-4'>
      {gallery.map((image, index) => (
        <GalleryImage
          key={index}
          image={image}
          className={`size-14 object-cover transition-opacity duration-200 ${
            index === currentIndex
              ? 'opacity-100 ring-2 ring-white'
              : 'opacity-60 hover:opacity-100'
          }`}
          onClick={() => onImageSelect(index)}
          isClickable
        />
      ))}
    </div>
  )
}

export const VisualArchiveGallery = () => {
  const store = useVisualArchiveGallery()

  // Create adapter for Villa Cóvico store
  const adapter: GalleryAdapter<ImageType> = {
    isOpen: store.isGalleryOpen || false,
    currentIndex: store.currentImageIndex,
    currentGalleryId: store.currentGalleryId,
    getImages: () => getGalleryImages(store.currentGalleryId),
    openGallery: (galleryId, startIndex) =>
      store.openGallery(galleryId as GalleryItems, startIndex),
    closeGallery: store.closeGallery,
    setIndex: store.setImage,
  }

  const gallery = useGallery(adapter)

  const { contextSafe } = useGSAP()

  useEffect(() => {
    // Prevent background scrolling when gallery is open
    document.body.style.overflow = gallery.isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [gallery.isOpen])

  const handlePrevious = contextSafe(() => {
    gallery.navigation.prev()
  })

  const handleNext = contextSafe(() => {
    gallery.navigation.next()
  })

  const handleImageSelect = contextSafe((index: number) => {
    gallery.navigation.goTo(index)
  })

  // Keyboard navigation
  useEffect(() => {
    if (!gallery.isOpen) return

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          handlePrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNext()
          break
        case 'Escape':
          e.preventDefault()
          gallery.controls.close()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [gallery.isOpen, gallery.controls, handleNext, handlePrevious])

  if (!gallery.isOpen || !gallery.images || gallery.images.length === 0) return null

  return createPortal(
    <div className='bg-covico-foreground/98 fixed inset-0 z-50 flex flex-col'>
      {/* Close Button */}
      <button
        onClick={gallery.controls.close}
        className='text-covico-background absolute top-4 right-4 z-10 transition-opacity hover:opacity-80'
      >
        <X size={40} />
      </button>

      {/* Main Gallery View */}
      <div className='flex flex-1 flex-col justify-center'>
        <GalleryMainView
          gallery={gallery.images}
          currentIndex={gallery.currentIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      {/* Preview Thumbnails */}
      <div className='bg-black/20 backdrop-blur-sm'>
        <GalleryPreview
          gallery={gallery.images}
          currentIndex={gallery.currentIndex}
          onImageSelect={handleImageSelect}
        />
      </div>
    </div>,
    document.body
  )
}
