import { cn } from '@/utils/css'

interface LogoSVGProps {
  className?: React.SVGAttributes<SVGElement>['className']
  id: string
  size?: string | number
  strokeWidth: React.SVGAttributes<SVGElement>['strokeWidth']
  children?: React.ReactNode
}

export const LogoSVG = ({
  className: customClass,
  id,
  size = 40,
  strokeWidth,
  children,
  ...props
}: LogoSVGProps) => {
  return (
    <svg viewBox='0 0 39 39' width={size} height={size}>
      <path
        id={id}
        d='M38 37H1L1 16L15 2L36 13L38 37Z'
        className={cn('fill-current stroke-current', customClass)}
        strokeWidth={strokeWidth}
        {...props}
      />
      {children}
    </svg>
  )
}
