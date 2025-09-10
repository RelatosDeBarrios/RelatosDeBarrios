import { Covico, CovicoSection } from '@/app/villacovico/types'

export type Nav = Omit<CovicoSection, 'title'> & {
  navItems: { href: NavItemsID; label: string }[]
}

export type NavItemsID = `#${Exclude<Covico, 'nav' | `quote-${string}` | 'footer'>}` | 'top'
