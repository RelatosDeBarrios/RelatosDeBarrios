'use client'
import { useGalleryStore } from '@/rengifo/store/galleryStore'
import { type BaseCardProps, Card } from './Card'
import { ImageType } from '@/types/general'

interface OpenGalleryCardProps extends BaseCardProps {
  id: string
}

export const OpenGalleryCard = ({
  id,
  title,
  subTitle,
  bg,
  className,
  disabled,
}: OpenGalleryCardProps) => {
  const openGallery = useGalleryStore((state) => state.openGallery)

  const handleOpenGallery = () => {
    openGallery(id, 0)
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
