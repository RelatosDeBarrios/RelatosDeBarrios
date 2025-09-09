import { ScrollSmoother, ScrollToPlugin } from 'gsap/all'
import { scrollTo } from '@/utils/dom'
import { NavItemsID } from '../types'
import gsap from 'gsap'

gsap.registerPlugin(ScrollToPlugin)

export const smoothScrollTo = (id: NavItemsID | 'top') => {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    gsap.to(window, {
      scrollTo: { y: id === 'top' ? 0 : id, autoKill: true, offsetY: 28 },
      duration: 1,
      ease: 'power2.inOut',
    })
  } else {
    scrollTo(id)
  }
}
