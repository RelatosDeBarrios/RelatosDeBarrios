import Image from 'next/image'
import { heroContent } from '@/rengifo/content/hero'
import { HeroTitleAction } from './HeroTitleAction'

export const HeroSection = () => {
  return (
    <header id={heroContent.id} className='relative h-screen landscape:h-[160dvh]'>
      <HeroTitleAction title={heroContent.title} subTitle={heroContent.subTitle} actions={heroContent.actions} />

      <video
        loop={heroContent.video.loop}
        muted={heroContent.video.muted}
        autoPlay={heroContent.video.autoplay}
        preload={heroContent.video.preload}
        className='pointer-events-none fixed inset-0 -z-10 aspect-video h-screen w-screen origin-center object-cover select-none'
      >
        <source src={heroContent.video.src} type='video/mp4' />
      </video>

      <Image
        src={heroContent.utilityImages!.bg.src}
        alt={heroContent.utilityImages!.bg.alt}
        width={heroContent.utilityImages!.bg.width}
        height={heroContent.utilityImages!.bg.height}
        className='pointer-events-none absolute -bottom-0 z-10 w-screen select-none'
      />
    </header>
  )
}
