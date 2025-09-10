import { useNavigationMenuStore } from '@/rengifo/store/navigationMenuStore'
import { cn } from '@/utils/css'

export const HamburgerButton = () => {
  const isMenuOpen = useNavigationMenuStore((state) => state.isMenuOpen)
  const setIsMenuOpen = useNavigationMenuStore((state) => state.setIsMenuOpen)

  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className='flex h-8 w-8 flex-col items-center justify-center space-y-1.5 lg:hidden'
      aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      <span
        className={cn(
          'block h-0.5 w-6 bg-white transition-all duration-300',
          isMenuOpen ? 'translate-y-2 rotate-45' : ''
        )}
      />
      <span className={cn('block h-0.5 w-6 bg-white transition-all duration-300', isMenuOpen ? 'opacity-0' : '')} />
      <span
        className={cn(
          'block h-0.5 w-6 bg-white transition-all duration-300',
          isMenuOpen ? '-translate-y-2 -rotate-45' : ''
        )}
      />
    </button>
  )
}
