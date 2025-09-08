import { Section } from '@/types/general'

export type Covico =
  | 'nav'
  | 'hero'
  | 'visual-archive'
  | 'downloads'
  | '3d'
  | 'book-documental'
  | `quote-${string}`
  | 'footer'

export type CovicoSection<C extends string = never> = Section<Covico, C>
