import { cn } from '@/utils/css'

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}
export const Paragraph = ({ children, className }: ParagraphProps) => {
  return (
    <p
      className={cn(
        'text-covico-foreground font-montserrat max-w-prose text-xl leading-snug',
        className
      )}
    >
      {children}
    </p>
  )
}
