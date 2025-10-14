import { ImageType } from '@/types/general'
import { GalleryImage } from './GalleryImage'
import { cn } from '@/utils/css'
import { Fragment } from 'react'

interface GalleryPreviewProps {
  gallery: ImageType[]
  currentIndex: number
  onImageSelect: (index: number) => void
}

export const GalleryPreview = ({ gallery, currentIndex, onImageSelect }: GalleryPreviewProps) => {
  return (
    <div className='flex flex-wrap justify-center gap-2 overflow-x-hidden p-4'>
      {gallery.map((image, index) => (
        <Fragment key={index}>
          <button
            aria-label={'Ir a la imágen número ' + index}
            onClick={() => onImageSelect(index)}
            className={cn(
              'aspect-square size-4 rounded-full xl:hidden',
              currentIndex === index
                ? 'bg-covico-yellow'
                : 'bg-covico-background/50 hover:bg-covico-background/80'
            )}
          />
          <GalleryImage
            image={image}
            className={`hidden size-14 object-cover transition-opacity duration-200 xl:block ${
              index === currentIndex
                ? 'opacity-100 ring-2 ring-white'
                : 'opacity-60 hover:opacity-100'
            }`}
            onClick={() => onImageSelect(index)}
            isClickable
          />
        </Fragment>
      ))}
    </div>
  )
}
