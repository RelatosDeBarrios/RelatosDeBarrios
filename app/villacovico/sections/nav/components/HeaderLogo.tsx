import { ImageType } from '@/types/general'
import { cn } from '@/utils/css'
import Image from 'next/image'

interface HeaderLogoProps {
  logo: ImageType
  className?: string
}

export const HeaderLogo = ({ logo, className }: HeaderLogoProps) => {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      height={logo.height}
      width={logo.width}
      className={cn('aspect-auto h-full w-auto', className)}
    />
  )
}
