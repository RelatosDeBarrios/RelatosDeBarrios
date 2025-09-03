'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { scrollTo } from '@/utils/dom'

export const useNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up')
  const prevScrollY = useRef(-1)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const direction = currentScrollY > prevScrollY.current ? 1 : -1
    setScrollDirection(direction === 1 ? 'down' : 'up')
    prevScrollY.current = currentScrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleScrollTo = (id: string, open: boolean) => {
    scrollTo(id)
    setIsMenuOpen(open)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const openMenu = () => setIsMenuOpen(true)

  return {
    toggleMenu,
    closeMenu,
    openMenu,
    handleScrollTo,
    isMenuOpen,
    scrollDirection,
  }
}
