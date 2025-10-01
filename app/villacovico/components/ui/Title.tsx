import { cn } from '@/utils/css'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'semibold' | 'bold'
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}

const TitleVariant = {
  size: {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  },
  weight: {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
}

export const Title = ({
  children,
  size = 'xl',
  weight = 'bold',
  heading,
  className,
}: TitleProps) => {
  const Heading = heading || 'h2'
  return (
    <Heading
      className={cn(
        'text-covico-foreground font-roboto max-w-prose tracking-wide',
        [TitleVariant.size[size]],
        [TitleVariant.weight[weight]],
        className
      )}
    >
      {children}
    </Heading>
  )
}
