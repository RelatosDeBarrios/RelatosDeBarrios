import { ImageType } from '@/types/general'
import { GalleryImage } from './GalleryImage'

interface GalleryPreviewProps {
  gallery: ImageType[]
  currentIndex: number
  onImageSelect: (index: number) => void
}

export const GalleryPreview = ({ gallery, currentIndex, onImageSelect }: GalleryPreviewProps) => {
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
