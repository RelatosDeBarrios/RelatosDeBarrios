import { SectionsId } from '@/app/(hub)/types'
import { TeamContent } from '@/types/core'
import { Section } from '@/types/general'

export interface TeamSection extends Section<SectionsId, never> {
  cards: TeamContent
}
