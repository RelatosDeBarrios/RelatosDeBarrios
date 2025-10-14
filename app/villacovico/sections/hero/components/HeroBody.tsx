'use client'

import { ImageType } from '@/types/general'
import Image from 'next/image'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollTextReveal } from '@/app/villacovico/hooks/useScrollTextReveal'
import { useRef } from 'react'

interface HeroBodyProps {
  images: {
    over: ImageType
    under: ImageType
  }
  description: string
  containerID: string
}

gsap.registerPlugin(SplitText, ScrollTrigger)

export const HeroBody = ({ images: { over, under }, description }: HeroBodyProps) => {
  const parentRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useScrollTextReveal(
    textRef,
    {
      trigger: parentRef,
      preset: 'centered',
      animation: {
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
        },
      },
      pin: {
        end: 'bottom bottom',
      },
    },
    { scope: parentRef }
  )

  return (
    <section
      ref={parentRef}
      className='parent relative flex h-[var(--hero-height)] w-full items-center justify-center [--hero-height:125vh] landscape:aspect-square landscape:h-auto'
    >
      {/* Parallax container for images */}
      <div className='relative size-full overflow-hidden rounded-xl'>
        <div
          aria-hidden
          className='to-covico-foreground/60 absolute z-3 w-full bg-gradient-to-b from-transparent landscape:aspect-square'
        />
        <Image
          src={under.src}
          alt={under.alt}
          width={under.width}
          height={under.height}
          className='absolute z-2 aspect-square h-[var(--hero-height)] w-full object-cover landscape:h-auto'
          priority
        />
        <Image
          src={over.src}
          alt={over.alt}
          width={over.width}
          height={over.height}
          className='absolute z-0 aspect-square h-[var(--hero-height)] w-full object-cover landscape:h-auto'
          priority
        />
      </div>

      {/* Animated description text */}
      <p
        ref={textRef}
        className='text font-roboto text-covico-background absolute z-4 max-w-prose px-4 text-center leading-tight font-semibold md:px-8 md:text-2xl xl:text-4xl xl:leading-snug'
      >
        {description}
      </p>
    </section>
  )
}
