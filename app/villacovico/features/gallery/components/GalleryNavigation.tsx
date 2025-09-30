import { ImageType } from '@/types/general'
import { GalleryImage } from './GalleryImage'

interface GalleryNavigationProps {
  gallery: ImageType[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  children: React.ReactNode
}

export const GalleryNavigation = ({
  gallery,
  currentIndex,
  onPrevious,
  onNext,
  children,
}: GalleryNavigationProps) => {
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
