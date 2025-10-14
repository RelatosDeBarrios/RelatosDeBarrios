import { cn } from '@/utils/css'

interface TitleProps {
  children: React.ReactNode
  className?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title = ({ children, className, headingLevel = 'h1' }: TitleProps) => {
  const Heading = headingLevel
  return (
    <Heading className={cn('text-5xl leading-none font-black text-white md:text-8xl lg:uppercase', className)}>
      {children}
    </Heading>
  )
}
