'use client'
import { useScrollTextReveal } from '@/app/villacovico/hooks/useScrollTextReveal'
import { useRef } from 'react'

interface QuoteProps {
  text: string
  title: string
  author: {
    name: string
    age: number
  }
}

export const AnimatedQuote = ({ text, title, author }: QuoteProps) => {
  const parentRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const citeRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useScrollTextReveal(
    textRef,
    {
      trigger: parentRef,
      preset: 'centered',
      pin: {
        disabled: true,
      },
      animation: {
        scrollTrigger: {
          start: '10% center',
          end: 'bottom 75%',
        },
      },
      timeline: [
        {
          target: citeRef,
          position: '>',
          animation: { from: { opacity: 0 }, to: { opacity: 1 } },
        },
        {
          target: titleRef,
          position: '>',
          animation: { from: { opacity: 0 }, to: { opacity: 1 } },
        },
      ],
    },
    { scope: parentRef }
  )

  return (
    <section
      ref={parentRef}
      className='quote-section text-covico-red relative mx-auto flex h-screen w-full max-w-2xl flex-col items-center justify-center px-4'
    >
      <blockquote className='relative w-full space-y-16'>
        <p ref={textRef} className='w-full text-center text-xl leading-tight md:text-4xl'>
          &quot;{text}&quot;
        </p>
        <cite ref={citeRef} className='block text-center text-lg leading-none font-bold not-italic'>
          {author.name} <br /> <span className='block text-sm font-medium'> {author.age} años</span>
        </cite>
      </blockquote>
      <h2 ref={titleRef} className='mt-4 text-right text-base font-semibold italic'>
        {title}
      </h2>
    </section>
  )
}
