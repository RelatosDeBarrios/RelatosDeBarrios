import { CovicoSection } from '@/app/villacovico/types'
import { Card } from '@/types/general'

export type VirtualTourType = 'outside' | 'inside'

export type VirtualTourCard = Card<VirtualTourType> & {
  description: string
}

export type VirtualTour = CovicoSection<VirtualTourType> & {
  cards: Record<VirtualTourType, VirtualTourCard>
}
