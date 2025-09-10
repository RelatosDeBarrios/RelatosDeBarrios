'use client'
import { useGalleryStore } from '@/rengifo/store/galleryStore'
import { type BaseCardProps, Card } from './Card'
import { getImagesById } from '@/rengifo/utils/galleryUtils'
import { ImageType } from '@/types/general'

interface OpenGalleryCardProps extends BaseCardProps {
  id: string
}

export const OpenGalleryCard = ({ id, title, subTitle, bg, className, disabled }: OpenGalleryCardProps) => {
  const openGallery = useGalleryStore((state) => state.openGallery)

  const handleOpenGallery = () => {
    const images = getImagesById(id)
    if (images.length > 0) {
      openGallery(images, 0, id)
    }
  }

  return (
    <Card
      variant='button'
      onClick={handleOpenGallery}
      title={title}
      subTitle={subTitle}
      bg={bg as ImageType}
      className={className}
      disabled={disabled}
    />
  )
}
