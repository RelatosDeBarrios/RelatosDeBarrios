'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { GalleryMainView } from './components/GalleryMainView'
import { GalleryPreview } from './components/GalleryPreview'
import { ImageType } from '@/types/general'
import { getGalleryImages } from './utils/galleryUtils'
import { useCovicoGallery } from './store/covicoGalleryStore'

// Register GSAP plugin
gsap.registerPlugin(useGSAP)

interface GalleryProps<T extends string> {
  galleries: {
    [key in T]: ImageType[]
  }
}

export const Gallery = <T extends string>({ galleries }: GalleryProps<T>) => {
  const id = useCovicoGallery((state) => state.currentGalleryId)
  const currentIndex = useCovicoGallery((state) => state.currentImageIndex)
  const isOpen = useCovicoGallery((state) => state.isGalleryOpen)
  const navigation = useCovicoGallery((state) => state.navigation)
  const close = useCovicoGallery((state) => state.closeGallery)

  const images = getGalleryImages({ galleries, id })

  const { contextSafe } = useGSAP()

  useEffect(() => {
    // Prevent background scrolling when gallery is open
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handlePrevious = contextSafe(() => {
    navigation.prev(images.length)
  })

  const handleNext = contextSafe(() => {
    navigation.next(images.length)
  })

  const handleImageSelect = contextSafe((index: number) => {
    navigation.goTo(index)
  })

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

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
          close()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, close, handleNext, handlePrevious])

  if (!isOpen || !images || images.length === 0) return null

  return createPortal(
    <div className='bg-covico-foreground/98 fixed inset-0 z-50 flex flex-col'>
      {/* Close Button */}
      <button
        onClick={close}
        className='text-covico-background absolute top-4 right-4 z-10 transition-opacity hover:opacity-80'
      >
        <X size={40} />
      </button>

      {/* Main Gallery View */}
      <div className='flex flex-1 flex-col justify-center'>
        <GalleryMainView
          gallery={images}
          currentIndex={currentIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      {/* Preview Thumbnails */}
      <div className='bg-black/20 backdrop-blur-sm'>
        <GalleryPreview
          gallery={images}
          currentIndex={currentIndex}
          onImageSelect={handleImageSelect}
        />
      </div>
    </div>,
    document.body
  )
}
