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
  const { textRef, parentRef, getAdditionalRef } = useAnimateText<HTMLParagraphElement>({
    preset: 'fullscreen',
    additionalElements: [
      {
        id: 'cite',
        animation: { opacity: 1, y: 0 },
        timing: 'after',
        offset: '+=0.2',
        initialState: { opacity: 0, y: 20 },
      },
      {
        id: 'title',
        animation: { opacity: 1, y: 0 },
        timing: 'after',
        offset: '+=0.4',
        initialState: { opacity: 0, y: 20 },
      },
    ],
  })

  return (
    <section
      ref={parentRef}
      className='quote-section text-covico-red relative mx-auto flex h-[150dvh] w-full max-w-2xl flex-col items-center justify-center gap-8 px-4'
    >
      <blockquote className='relative w-full'>
        <div className='flex h-[100dvh] items-center justify-center'>
          <p ref={textRef} className='w-full text-center text-5xl leading-relaxed'>
            &quot;{text}&quot;
          </p>
        </div>
        <footer className='absolute right-0 bottom-0 space-y-2 text-right'>
          <cite ref={getAdditionalRef('cite')} className='block text-lg font-medium'>
            {author.name}, {author.age} años
          </cite>
          <h2 ref={getAdditionalRef<HTMLHeadingElement>('title')} className='text-base font-normal'>
            {title}
          </h2>
        </footer>
      </blockquote>
    </section>
  )
}
