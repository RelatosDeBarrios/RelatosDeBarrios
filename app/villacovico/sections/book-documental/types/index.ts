import { CovicoSection } from '@/app/villacovico/types'
import { Card } from '@/types/general'

export type BookDocumentalType = 'book' | 'documental'

export type BookDocumentalCard = Card<BookDocumentalType> & {
  description: string
}

export type BookDocumental = CovicoSection<BookDocumentalType> & {
  cards: Record<BookDocumentalType, BookDocumentalCard>
}
