'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroTitleProps {
  title: string
  containerID: string
}

gsap.registerPlugin(ScrollTrigger)

export function HeroTitle({ title, containerID }: HeroTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (!titleRef.current) return

    gsap.to(titleRef.current, {
      opacity: 0.3,
      scrollTrigger: {
        trigger: `#${containerID}`,
        start: 'top top',
        end: 'bottom bottom',
        pin: titleRef.current,
        pinSpacing: false,
        scrub: 1,
      },
    })
  })

  return (
    <div className='text-covico-foreground relative z-1 mx-auto w-fit'>
      <h1
        ref={titleRef}
        className='font-instrument text-fluid text-covico-foregroun text-center font-black whitespace-nowrap lowercase will-change-transform'
      >
        {title}
      </h1>
    </div>
  )
}
