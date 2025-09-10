import { Title } from '@/rengifo/components/ui/Title'
import { YellowBar } from '@/rengifo/components/ui/YellowBar'
import { resourcesContent } from '@/rengifo/content/resources'
import { Card } from '@/rengifo/components/ui/Card'

const { book, documentary } = resourcesContent.cards!

export const ResourcesSection = () => {
  return (
    <section id={resourcesContent.id} className='bg-rengifo-azul-darker to-50% xl:pt-40 2xl:-mt-60 2xl:pt-24'>
      <article className='relative z-20 container mx-auto px-4 md:px-8'>
        <div>
          <Title headingLevel='h2' className='text-rengifo-amarillo z-10 w-fit'>
            {resourcesContent.title}
            <br />
            <span className='text-white'>{resourcesContent.subTitle}</span>
          </Title>
          <YellowBar className='-ml-10' />
        </div>
        <section className='flex flex-wrap justify-around gap-8 py-10 md:py-20'>
          <Card
            variant='link'
            key={book.id}
            target='_blank'
            rel='noopener noreferrer'
            href={book.href!}
            title={book.title}
            subTitle={book.subTitle}
            id={book.id}
            bg={book.bg}
            disabled={book.disabled}
            className='h-full min-h-38 max-w-lg xl:min-h-64!'
          />

          <Card
            variant='link'
            key={documentary.id}
            target='_blank'
            rel='noopener noreferrer'
            href={documentary.href!}
            title={documentary.title}
            subTitle={documentary.subTitle}
            id={documentary.id}
            bg={documentary.bg}
            disabled={documentary.disabled}
            className='h-full min-h-38 max-w-lg xl:min-h-64!'
          />
        </section>
      </article>
    </section>
  )
}
