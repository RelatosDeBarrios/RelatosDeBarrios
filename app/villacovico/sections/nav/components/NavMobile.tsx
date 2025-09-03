import { Menu, X } from 'lucide-react'

interface NavMobileProps {
  toggleMenu: () => void
  isMenuOpen: boolean
}

export const NavMobile = ({ toggleMenu, isMenuOpen }: NavMobileProps) => {
  return (
    <div className='md:hidden'>
      <button onClick={toggleMenu} className={`transition-colors duration-300`}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  )
}
