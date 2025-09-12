'use client'
import { useEffect, useRef } from 'react'
import { useVisualArchiveGallery } from '../store/visualArchiveGalleryStore'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { ImageType } from '@/types/general'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

// Register GSAP plugin
gsap.registerPlugin(useGSAP)

interface VisualArchiveGalleryProps {
  gallery: ImageType[]
}

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
}: {
  gallery: ImageType[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
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
    <div className='grid min-h-[70vh] grid-cols-1 items-center justify-items-center gap-4 px-4 md:grid-cols-3'>
      <GalleryNavigation
        gallery={gallery}
        currentIndex={currentIndex}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      {/* Central Main Image */}
      <div className='flex items-center justify-center'>
        <Image
          ref={mainImageRef}
          src={gallery[currentIndex].src}
          alt={gallery[currentIndex].alt}
          width={gallery[currentIndex].width}
          height={gallery[currentIndex].height}
          className='max-h-[70vh] w-auto object-contain'
        />
      </div>
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
    <div className='flex justify-center gap-2 overflow-x-auto p-4'>
      {gallery.map((image, index) => (
        <GalleryImage
          key={index}
          image={image}
          className={`h-16 w-16 object-cover transition-opacity duration-200 ${
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

export const VisualArchiveGallery = ({ gallery }: VisualArchiveGalleryProps) => {
  const isGalleryOpen = useVisualArchiveGallery((state) => state.isGalleryOpen)
  const closeGallery = useVisualArchiveGallery((state) => state.closeGallery)
  const currentImageIndex = useVisualArchiveGallery((state) => state.currentImageIndex)
  const setImage = useVisualArchiveGallery((state) => state.setImage)
  const setNextImage = useVisualArchiveGallery((state) => state.setNextImage)
  const setPrevImage = useVisualArchiveGallery((state) => state.setPrevImage)

  const { contextSafe } = useGSAP()

  useEffect(() => {
    // Prevent background scrolling when gallery is open
    document.body.style.overflow = isGalleryOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isGalleryOpen])

  const handlePrevious = contextSafe(() => {
    setPrevImage(gallery.length)
  })

  const handleNext = contextSafe(() => {
    setNextImage(gallery.length)
  })

  const handleImageSelect = contextSafe((index: number) => {
    setImage(index)
  })

  // Keyboard navigation
  useEffect(() => {
    if (!isGalleryOpen) return

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
          closeGallery()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isGalleryOpen, gallery.length, closeGallery, handleNext, handlePrevious])

  if (!isGalleryOpen || !gallery || gallery.length === 0) return null

  return createPortal(
    <div className='bg-covico-foreground/98 fixed inset-0 z-50 flex flex-col'>
      {/* Close Button */}
      <button
        onClick={closeGallery}
        className='text-covico-background absolute top-4 right-4 z-10 transition-opacity hover:opacity-80'
      >
        <X size={40} />
      </button>

      {/* Main Gallery View */}
      <div className='flex flex-1 flex-col justify-center'>
        <GalleryMainView
          gallery={gallery}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      {/* Preview Thumbnails */}
      <div className='bg-black/20 backdrop-blur-sm'>
        <GalleryPreview
          gallery={gallery}
          currentIndex={currentImageIndex}
          onImageSelect={handleImageSelect}
        />
      </div>
    </div>,
    document.body
  )
}
