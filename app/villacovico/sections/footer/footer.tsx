import Image from 'next/image'
import { HeaderLogo } from '../nav/components/HeaderLogo'
import { NAV } from '@/app/villacovico/sections/nav/content'

export const Footer = () => {
  return (
    <footer className='relative w-full p-4 xl:p-10'>
      <figure className='relative aspect-square w-full overflow-hidden rounded-xl'>
        <Image
          src='/villacovico/footer.webp'
          alt='Imágen de footer'
          width={1620}
          height={1620}
          className='absolute aspect-square w-full'
        />
      </figure>
      <section className='absolute right-0 bottom-8 left-0 z-10 w-full xl:bottom-40'>
        <div className='mx-auto w-fit'>
          <HeaderLogo logo={NAV.utilityImages.logo} className='mx-auto w-fit xl:scale-150' />
          <div className='mx-auto flex items-center justify-center gap-2 xl:mt-10 xl:gap-8'>
            <Image
              src='/villacovico/1.png'
              alt=''
              className='h-18 w-fit xl:h-50'
              width={568}
              height={567}
            />
            <Image
              src='/villacovico/2.png'
              alt=''
              className='h-10 w-fit xl:h-30'
              width={2498}
              height={995}
            />
            <Image
              src='/villacovico/3.png'
              alt=''
              className='h-12 w-fit xl:h-40'
              width={7729}
              height={3300}
            />
          </div>
          <p className='text-covico-background max-w-sm px-4 text-center xl:max-w-full xl:pt-20'>
            Relatos de Barrios 2025 | Desarrollado por StrocsDev
          </p>
        </div>
      </section>
    </footer>
  )
}
