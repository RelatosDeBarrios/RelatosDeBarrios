import { Title } from '@/app/villacovico/components/ui/Title'
import { VirtualTourType } from '../types'
import { Paragraph } from '@/app/villacovico/components/ui/Paragraph'
import Image from 'next/image'
import { ImageType } from '@/types/general'
import { Button } from '@/app/villacovico/components/ui/Button'
import { cn } from '@/utils/css'

interface VirtualTourCardProps {
  id: VirtualTourType
  title: string
  subTitle: string
  description: string
  href: string
  bg: ImageType
  position: 'top' | 'bottom'
}

const positionBasedStyles = {
  top: '[&>header]:order-1 [&>section]:order-2 [&>section>nav]:right-4 md:[&>section>nav]:right-8 [&>header>div>h3]:order-1 [&>header>div>h2]:order-2',
  bottom: '[&>header]:order-2 [&>section]:order-1 md:[&>section>nav]:left-8 [&>section>nav]:left-4',
}

export function VirtualTourCard({
  id,
  title,
  subTitle,
  description,
  href,
  bg,
  position,
}: VirtualTourCardProps) {
  return (
    <article
      id={id}
      className={cn(
        'flex h-full w-full flex-col justify-center gap-4',
        positionBasedStyles[position]
      )}
    >
      <header className='flex flex-col gap-4'>
        <div className='grid'>
          <Title heading='h2' size='xl' weight='semibold'>
            {title}
          </Title>
          <h3 className='font-roboto text-4xl font-medium'>{subTitle}</h3>
        </div>
        {!!description && <Paragraph className='max-w-[250px]'>{description}</Paragraph>}
      </header>
      <section className='group relative aspect-video w-full overflow-hidden rounded-2xl'>
        <Image
          src={bg.src}
          alt={bg.alt}
          width={bg.width}
          height={bg.height}
          className='w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
        />
        <nav className='absolute bottom-4'>
          <Button as='a' href={href} className='text-lg'>
            Mira el recorrido
          </Button>
        </nav>
      </section>
    </article>
  )
}
