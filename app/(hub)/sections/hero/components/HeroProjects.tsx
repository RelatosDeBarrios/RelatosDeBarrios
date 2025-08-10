import { HERO } from '../content'
import { ProjectCard } from './ProjectCard'
import { NewBadge } from '@/hub/components/NewBadge'

const { rengifo, covico } = HERO.cards!

export const HeroProjects = () => {
  return (
    <section className='mx-auto flex w-fit gap-4 not-landscape:flex-col landscape:gap-20'>
      <ProjectCard
        href={rengifo.href!}
        title={rengifo.title}
        videoSrc={rengifo.bg.src}
      />
      <ProjectCard
        href={covico.href!}
        title={covico.title}
        badge={<NewBadge />}
        disabled
      />
    </section>
  )
}
