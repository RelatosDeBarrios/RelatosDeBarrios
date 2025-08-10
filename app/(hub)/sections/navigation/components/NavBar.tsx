import { NAV } from '../content/navigation'
import { NavButton } from './NavButton'

export const NavBar = () => {
  return (
    <nav className='bg-hub-background/10 fixed top-3 right-0 left-0 z-50 mx-auto flex w-fit gap-6 rounded-xl px-6 py-3 backdrop-blur-sm'>
      {NAV.map(({ id, label }) => (
        <NavButton
          key={id}
          navTo={'#' + id}
          className='hover:text-hub-primary text-hub-background lowercase transition-colors'
          aria-label={label}
        >
          {label}
        </NavButton>
      ))}
    </nav>
  )
}
