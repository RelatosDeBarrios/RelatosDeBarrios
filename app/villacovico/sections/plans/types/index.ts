import { CovicoSection } from '@/app/villacovico/types'
import { Card, ImageType } from '@/types/general'

export type PlanType = 'isometrics' | 'floor-plans'

export type PlanCard = Omit<Card<PlanType>, 'bg'> & {
  description: string
  downloadLink: string
  collection: ImageType[]
}

export type Plans = CovicoSection & {
  cards: Record<PlanType, PlanCard>
}
