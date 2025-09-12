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
  const { textRef, parentRef } = useAnimateText()
  return (
    <section ref={parentRef} className='quote-section h-[200dvh] w-full'>
      <blockquote>
        <p ref={textRef}>&quot;{text}&quot;</p>
        <cite>
          {author.name}, {author.age} años
        </cite>
      </blockquote>
      <h2>{title}</h2>
    </section>
  )
}
