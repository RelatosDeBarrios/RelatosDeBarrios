import { AnimatedQuote } from './components/AnimatedQuote'
import { QUOTES } from './content'

interface QuoteProps {
  position: keyof typeof QUOTES
}

export default function Quote({ position = 1 }: QuoteProps) {
  const { title, description, author } = QUOTES[position]

  return <AnimatedQuote text={description} title={title} author={author} />
}
