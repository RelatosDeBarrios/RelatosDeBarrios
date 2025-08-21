'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { scrollTo } from '@/utils/dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: 'top', label: 'Inicio' },
    { href: '#laminas', label: 'Láminas' },
    { href: '#archivo', label: 'Archivo Fotográfico' },
    { href: '#recorridos', label: 'Recorridos 3D' },
    { href: '#documental', label: 'Documental' },
  ]

  const handleScrollTo = (id: string, open: boolean) => {
    scrollTo(id)
    setIsMenuOpen(open)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex-shrink-0'>
            <h1
              className={`font-serif text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Relatos de Barrios
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleScrollTo(item.href, false)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='bg-background/95 border-border space-y-1 border-t px-2 pt-2 pb-3 backdrop-blur-md sm:px-3'>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className='text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-colors'
                  onClick={() => handleScrollTo(item.href, false)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
