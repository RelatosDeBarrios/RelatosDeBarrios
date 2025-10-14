import { cn } from '@/utils/css'

interface BaseButtonProps {
  children: React.ReactNode | string
  className?: string
  variant?: 'primary' | 'secondary'
}

type ButtonAsButton = BaseButtonProps & {
  as?: 'button'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type ButtonAsLink = BaseButtonProps & {
  as: 'a'
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsLink

const buttonVariant = {
  primary:
    'bg-covico-foreground text-covico-background hover:bg-covico-background hover:text-covico-foreground',
  secondary:
    'bg-covico-background text-covico-foreground border border-covico-foreground hover:bg-covico-foreground hover:text-covico-background',
}

export const Button = ({ children, className, variant, as = 'button', ...props }: ButtonProps) => {
  const classNames = cn(
    'font-montserrat cursor-pointer rounded-md px-6 py-2 text-xl transition-colors duration-300',
    buttonVariant[variant || 'primary'],
    className
  )

  if (as === 'button') {
    return (
      <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classNames}>
        {children}
      </button>
    )
  }

  return (
    <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={classNames}>
      {children}
    </a>
  )
}
