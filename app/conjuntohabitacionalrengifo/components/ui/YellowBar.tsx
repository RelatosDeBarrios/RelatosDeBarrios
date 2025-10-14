import { cn } from '@/utils/css'

interface YellowBarProps {
  className?: string
}

export const YellowBar = ({ className }: YellowBarProps) => {
  return <div className={cn('bg-rengifo-amarillo h-1.5 w-full md:h-2.5', className)} />
}
