import { HERO } from '../content'
import { HeroLogo } from './HeroLogo'
import { HeroProjects } from './HeroProjects'

export const Hero = () => {
  return (
    <section
      id={HERO.id}
      className='mx-auto grid min-h-[90dvh] w-fit place-items-center pt-10'
    >
      <div className=''>
        <HeroLogo {...HERO.utilityImages!.logo} />
        <p className='text-hub-primary relative mx-auto max-w-lg text-center text-xl leading-none font-light md:text-2xl md:leading-tight'>
          <i>{HERO.description}</i>
        </p>
      </div>
      <HeroProjects />
    </section>
  )
}
