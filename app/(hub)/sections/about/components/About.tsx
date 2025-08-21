import Markdown from 'react-markdown'
import { ABOUT } from '../content'
import { Title } from '@/app/(hub)/components/Title'

export const About = () => {
  return (
    <section
      id={ABOUT.id}
      className='container flex min-h-screen flex-col items-center justify-center'
    >
      <article className='space-y-10 pt-14'>
        <Title>{ABOUT.title}</Title>
        <div className='text-hub-primary mx-auto max-w-prose space-y-8 px-1 py-2 md:px-4'>
          <Markdown>{ABOUT.description}</Markdown>
        </div>
      </article>
    </section>
  )
}
