import { ImageType } from '@/types/general'
import Image from 'next/image'

interface HeaderLogoProps {
  logo: ImageType
}

export const HeaderLogo = ({ logo }: HeaderLogoProps) => {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      height={logo.height}
      width={logo.width}
      className='aspect-auto h-full w-auto'
    />
  )
}
