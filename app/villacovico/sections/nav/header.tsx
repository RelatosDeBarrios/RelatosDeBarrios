'use client'

import { NAV } from './content'
import { useNav } from './hooks/useNav'
import { cn } from '@/utils/css'
import { HeaderNav } from './components/HeaderNav'
import { NavMobile } from './components/NavMobile'
import { NavMobilePanel } from './components/NavMobilePanel'
import { HeaderLogo } from './components/HeaderLogo'
import Link from 'next/link'

export default function Header() {
  const { scrollDirection, isMenuOpen, toggleMenu, handleScrollTo } = useNav()

  return (
    <header
      className={cn(
        'bg-covico-background fixed top-0 z-50 w-full transition-all duration-300 transform-3d',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <Link href='/' aria-label='Villacovico Logo' className='group h-20 shrink-0'>
            <HeaderLogo className='mix-blend-difference' logo={NAV.utilityImages.logo} />
          </Link>

          <HeaderNav navItems={NAV.navItems} handleScrollTo={handleScrollTo} />

          {/* Mobile menu button */}
          <NavMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Mobile Navigation */}
        <NavMobilePanel
          isMenuOpen={isMenuOpen}
          navItems={NAV.navItems}
          handleScrollTo={handleScrollTo}
        />
      </nav>
    </header>
  )
}
