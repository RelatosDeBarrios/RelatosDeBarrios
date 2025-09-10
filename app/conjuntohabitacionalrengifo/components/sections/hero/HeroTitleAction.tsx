'use client'

import { Button } from '@/rengifo/components/ui/Button'
import { Title } from '@/rengifo/components/ui/Title'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroAction } from '@/rengifo/types/content'
import { useRef } from 'react'
import { YellowBar } from '@/rengifo/components/ui/YellowBar'

interface HeroTitleActionProps {
  title: string
  subTitle: string
  actions: HeroAction[]
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const HeroTitleAction = ({ title, subTitle, actions }: HeroTitleActionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current?.closest('header'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0, // try 1 for smoother scrub, tweak as needed
          markers: false,
        },
        y: 800,
        ease: 'none',
      })
    },
    { scope: containerRef }
  )

  return (
    <section ref={sectionRef} className='container mx-auto flex h-2/3 w-full items-center justify-end px-8 md:h-1/2'>
      {/* Title Container with decorative bar */}
      <div ref={containerRef} className='relative flex w-fit flex-col items-end will-change-transform'>
        <YellowBar />
        <Title className='w-fit max-w-2xl pt-4 text-right text-4xl font-bold md:text-6xl' headingLevel='h1'>
          {title} <span className='font-black'>{subTitle}</span>
        </Title>
        {/* Action Buttons */}
        <div className='mt-4 w-fit space-x-4'>
          {actions.map((action) => (
            <Button key={action.id} text={action.label} href={action.href} />
          ))}
        </div>
      </div>
    </section>
  )
}
