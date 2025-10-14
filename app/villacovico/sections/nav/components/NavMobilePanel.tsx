import { NavItemsID } from '../types'

interface NavMobilePanelProps {
  isMenuOpen: boolean
  navItems: { href: string; label: string }[]
  handleScrollTo: (id: NavItemsID) => void
}

export const NavMobilePanel = ({ isMenuOpen, navItems, handleScrollTo }: NavMobilePanelProps) => {
  if (!isMenuOpen) return null

  return (
    <div className='lg:hidden'>
      <div className='bg-background/95 border-border space-y-1 border-t px-2 pt-2 pb-3 backdrop-blur-md sm:px-3'>
        {navItems.map((item) => (
          <button
            key={item.href}
            className='text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-colors'
            onClick={() => handleScrollTo(item.href as NavItemsID)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
