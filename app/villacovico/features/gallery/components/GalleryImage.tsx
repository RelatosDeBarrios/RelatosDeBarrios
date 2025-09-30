import { ImageType } from '@/types/general'
import Image from 'next/image'

interface GalleryImageProps {
  ref?: React.RefObject<HTMLImageElement | null>
  image: ImageType
  className?: string
  onClick?: () => void
  isClickable?: boolean
}

export const GalleryImage = ({
  ref,
  image,
  className = '',
  onClick,
  isClickable = false,
}: GalleryImageProps) => {
  return (
    <Image
      ref={ref}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`${className} ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    />
  )
}
