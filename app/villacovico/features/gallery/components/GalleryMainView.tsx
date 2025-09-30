import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
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
