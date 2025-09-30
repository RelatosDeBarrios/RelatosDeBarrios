import { HeroBody } from './components/HeroBody'
import { HeroTitle } from './components/HeroTitle'
import { HERO } from './content'

export function Hero() {
  const { id, title, utilityImages, description } = HERO

  return (
    <article id={id} className='relative pt-60'>
      {/* Sticky title component */}
      <HeroTitle containerID={id} title={title} />

      {/* Hero content with parallax images and animated text */}
      <HeroBody
        containerID={id}
        images={{
          over: utilityImages?.bg_over,
          under: utilityImages?.bg_under,
        }}
        description={description}
      />
    </article>
  )
}
