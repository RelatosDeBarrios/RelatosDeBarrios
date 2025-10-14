import { useGSAP } from '@gsap/react'
import { useRef, useEffect, useState } from 'react'
import { GalleryNavigation } from './GalleryNavigation'
import { ImageType } from '@/types/general'
import { GalleryImage } from './GalleryImage'
import gsap from 'gsap'

interface GalleryMainViewProps {
  gallery: ImageType[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

gsap.registerPlugin(useGSAP)

export const GalleryMainView = ({
  gallery,
  currentIndex,
  onPrevious,
  onNext,
}: GalleryMainViewProps) => {
  const mainImageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  useGSAP(() => {
    if (mainImageRef.current) {
      gsap.fromTo(mainImageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    }
  }, [currentIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onTouchStart = (e: TouchEvent) => {
      setTouchEnd(null)
      setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return

      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance

      if (isLeftSwipe) {
        onNext()
      } else if (isRightSwipe) {
        onPrevious()
      }
    }

    container.addEventListener('touchstart', onTouchStart)
    container.addEventListener('touchmove', onTouchMove)
    container.addEventListener('touchend', onTouchEnd)

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [touchStart, touchEnd, onNext, onPrevious])

  return (
    <div
      ref={containerRef}
      className='grid min-h-[80vh] grid-cols-1 items-center justify-items-center gap-4 px-4 md:grid-cols-4'
    >
      <GalleryNavigation
        gallery={gallery}
        currentIndex={currentIndex}
        onPrevious={onPrevious}
        onNext={onNext}
      >
        {/* Central Main Image */}
        <div className='col-span-2 flex items-center justify-center'>
          <GalleryImage
            ref={mainImageRef}
            image={gallery[currentIndex]}
            className='max-h-[80vh] w-auto object-contain'
          />
        </div>
      </GalleryNavigation>
    </div>
  )
}
