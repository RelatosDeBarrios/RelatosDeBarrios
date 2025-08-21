import { ImageType } from '@/types/general'
import Image from 'next/image'

export const HeroLogo = (image: ImageType) => {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes='512px'
      priority
      className='w-full mix-blend-luminosity'
    />
  )
}
