interface HeaderNavProps {
  navItems: { href: string; label: string }[]
  handleScrollTo: (id: string) => void
}

export const HeaderNav = ({ navItems, handleScrollTo }: HeaderNavProps) => {
  return (
    <div className='ml-10 hidden items-baseline gap-8 md:flex'>
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => handleScrollTo(item.href)}
          className={'text-instrument hover:text-covico-red cursor-pointer px-3 py-2 text-lg lowercase duration-300'}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
