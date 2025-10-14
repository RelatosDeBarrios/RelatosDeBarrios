import Image from 'next/image'
import { HeaderLogo } from '../nav/components/HeaderLogo'
import { NAV } from '@/app/villacovico/sections/nav/content'

export const Footer = () => {
  return (
    <footer className='relative w-full p-10'>
      <figure className='relative aspect-square w-full overflow-hidden rounded-xl'>
        <Image
          src='/villacovico/footer.webp'
          alt='Imágen de footer'
          width={1620}
          height={1620}
          className='absolute aspect-square w-full'
        />
      </figure>
      <section className='absolute right-0 bottom-40 left-0 z-10 w-full'>
        <div className='mx-auto w-fit'>
          <HeaderLogo logo={NAV.utilityImages.logo} className='mx-auto w-fit scale-150' />
          <div className='mx-auto mt-10 flex items-center justify-center gap-8'>
            <Image
              src='/villacovico/1.png'
              alt=''
              className='h-50 w-fit'
              width={568}
              height={567}
            />
            <Image
              src='/villacovico/2.png'
              alt=''
              className='h-30 w-fit'
              width={2498}
              height={995}
            />
            <Image
              src='/villacovico/3.png'
              alt=''
              className='h-40 w-fit'
              width={7729}
              height={3300}
            />
          </div>
          <p className='text-covico-background pt-20 text-center'>
            Relatos de Barrios 2025 | Desarrollado por StrocsDev
          </p>
        </div>
      </section>
    </footer>
  )
}
