'use client'

import { scrollTo } from '@/utils/dom'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  navTo: string
  children?: React.ReactNode
}

export const NavButton = ({ navTo, children, ...rest }: NavButtonProps) => {
  return (
    <button
      {...rest}
      onClick={() => scrollTo(navTo)}
      className='hover:text-hub-primary text-hub-background cursor-pointer lowercase transition-colors'
    >
      {children}
    </button>
  )
}
