import { ImageType } from '@/types/general'
import { cn } from '@/utils/css'
import Image from 'next/image'
import { PlanType } from '../types'
import { Button } from '@/app/villacovico/components/ui/Button'
import { Title } from '@/app/villacovico/components/ui/Title'
import { Paragraph } from '@/app/villacovico/components/ui/Paragraph'
import { PlansOpenGalleryButton } from './PlansOpenGalleryButton'

interface PlansCardProps {
  id: PlanType
  title: string
  subTitle: string
  description: string
  downloadLink: string
  bg: ImageType
  orientation: 'left' | 'right'
}

const orientationBasedStyles = {
  left: '[&>header]:text-right [&>header]:items-end [&>section]:justify-self-start [&>section>nav]:right-8',
  right:
    '[&>header]:text-left [&>header]:items-start [&>section]:justify-self-end [&>header]:order-1 [&>section>nav>a]:order-1 [&>section>nav]:left-8',
}

export function PlansCard({
  id,
  title,
  subTitle,
  description,
  downloadLink,
  bg,
  orientation = 'left',
}: PlansCardProps) {
  return (
    <article
      id={id}
      className={cn('grid h-full w-full grid-cols-2 gap-4', orientationBasedStyles[orientation])}
    >
      <header className='flex flex-col gap-4 self-center'>
        <div>
          <Title heading='h2' size='lg' weight='semibold'>
            {title}
          </Title>
          <h3 className='font-roboto text-4xl font-medium'>{subTitle}</h3>
        </div>
        <Paragraph className='max-w-[250px]'>{description}</Paragraph>
      </header>
      <section className='relative'>
        <Image
          src={bg.src}
          alt={bg.alt}
          width={bg.width}
          height={bg.height}
          className='h-full rounded-2xl object-cover grayscale'
        />

        <nav className='absolute bottom-8 flex gap-4'>
          <Button
            as='a'
            variant='secondary'
            href={downloadLink}
            rel='noopener noreferrer'
            className='text-lg'
          >
            Descarga contenido
          </Button>
          <PlansOpenGalleryButton id={id} />
        </nav>
      </section>
    </article>
  )
}
