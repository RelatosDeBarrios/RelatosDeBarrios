'use client'

import { ImageType } from '@/types/general'
import Image from 'next/image'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimateText } from '@/app/villacovico/hooks/useAnimateText'

interface HeroBodyProps {
  images: {
    over: ImageType
    under: ImageType
  }
  description: string
  containerID: string
}

gsap.registerPlugin(SplitText, ScrollTrigger)

export const HeroBody = ({
  images: { over, under },
  description,
}: HeroBodyProps) => {
  const { textRef, parentRef } = useAnimateText()

  return (
    <section
      ref={parentRef}
      className='relative flex aspect-square size-full items-center justify-center'
    >
      {/* Parallax container for images */}
      <div className='relative size-full overflow-hidden rounded-xl'>
        <div
          aria-hidden
          className='to-covico-foreground/60 absolute z-3 aspect-square w-full bg-gradient-to-b from-transparent'
        />
        <Image
          src={under.src}
          alt={under.alt}
          width={under.width}
          height={under.height}
          className='absolute z-2 aspect-square w-full'
          priority
        />
        <Image
          src={over.src}
          alt={over.alt}
          width={over.width}
          height={over.height}
          className='absolute z-0 aspect-square w-full'
          priority
        />
      </div>

      {/* Animated description text */}
      <p
        ref={textRef}
        className='font-roboto text-covico-background absolute z-4 max-w-prose text-center text-4xl leading-snug font-semibold'
      >
        {description}
      </p>
    </section>
  )
}
