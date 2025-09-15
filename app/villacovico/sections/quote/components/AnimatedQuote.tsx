'use client'
import { useAnimateText } from '@/app/villacovico/hooks/useAnimateText'

interface QuoteProps {
  text: string
  title: string
  author: {
    name: string
    age: number
  }
}

export const AnimatedQuote = ({ text, title, author }: QuoteProps) => {
  const { textRef, parentRef } = useAnimateText<HTMLParagraphElement, HTMLElement>({
    parent: { start: 'top top', end: 'bottom bottom' },
    lines: { start: 'top 70%', end: 'bottom bottom' },
  })
  return (
    <section
      ref={parentRef}
      className='quote-section text-covico-red relative mx-auto flex h-[150dvh] w-full max-w-2xl flex-col items-center gap-8 px-4'
    >
      <blockquote>
        <div className='flex h-[100dvh] items-center justify-center'>
          <p ref={textRef} className='w-full text-center text-5xl'>
            &quot;{text}&quot;
          </p>
        </div>
        <cite className='absolute right-0 bottom-46 block text-right text-lg font-medium'>
          {author.name}, {author.age} años
        </cite>
        <h2 className='absolute right-0 bottom-40 text-right'>{title}</h2>
      </blockquote>
    </section>
  )
}
