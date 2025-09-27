import { CovicoSection } from '@/app/villacovico/types'
import { Card, ImageType } from '@/types/general'

export type PlanType = 'isometric' | 'floor-plans'

export type PlanCard = Card<PlanType> & {
  description: string
  downloadLink: string
  collection: ImageType[]
}

export type Plans = CovicoSection & {
  cards: Record<PlanType, PlanCard>
}
