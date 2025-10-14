'use client'

import { Logo } from '@/rengifo/components/ui/Logo'
import { scrollTo } from '@/utils/dom'

export const NavLogo = () => {
  return (
    <button onClick={() => scrollTo('top')} className='flex items-center text-white' aria-label='Ir al inicio'>
      <Logo className='h-10 w-auto cursor-pointer' />
    </button>
  )
}
