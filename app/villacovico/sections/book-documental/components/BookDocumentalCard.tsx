import { Button } from '@/app/villacovico/components/ui/Button'
import { Paragraph } from '@/app/villacovico/components/ui/Paragraph'
import { Title } from '@/app/villacovico/components/ui/Title'
import Image from 'next/image'

interface BookDocumentalCardProps {
  id: string
  title: string
  subTitle: string
  description: string
  href: string
  bg: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export function BookDocumentalCard({
  id,
  title,
  subTitle,
  description,
  href,
  bg,
}: BookDocumentalCardProps) {
  return (
    <a
      href={href}
      className='group relative block aspect-square h-full w-full overflow-hidden rounded-2xl'
    >
      <article id={id} className='grid h-full place-content-center gap-6 p-10'>
        <header>
          <div>
            <Title
              heading='h2'
              size='xl'
              weight='semibold'
              className='group-hover:text-covico-background'
            >
              {title}
            </Title>
            <h3 className='font-roboto group-hover:text-covico-background text-4xl font-medium'>
              {subTitle}
            </h3>
          </div>
          <Paragraph className='group-hover:text-covico-background max-w-2xl'>
            {description}
          </Paragraph>
        </header>
        <section>
          <Button as='button'>Ver</Button>
        </section>
      </article>

      <Image
        src={bg.src}
        alt={bg.alt}
        width={bg.width}
        height={bg.height}
        className='absolute top-0 -z-10 aspect-auto size-full object-cover object-center opacity-50 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100'
      />
    </a>
  )
}
