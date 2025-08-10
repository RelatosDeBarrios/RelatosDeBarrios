import { Title } from '@/app/(hub)/components/Title'
import { TEAM } from '../content'
import { TeamList } from './TeamList'

export const Team = () => {
  return (
    <article
      id={TEAM.id}
      className='flex min-h-screen w-full flex-col items-center justify-center py-14'
    >
      <Title>{TEAM.title}</Title>
      <TeamList />
    </article>
  )
}
