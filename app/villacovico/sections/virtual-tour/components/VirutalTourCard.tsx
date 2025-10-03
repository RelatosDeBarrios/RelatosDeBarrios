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
  top: '[&>header]:order-1 [&>section]:order-2',
  bottom: '[&>header]:order-2 [&>section]:order-1',
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
      className={cn('grid h-full w-full grid-rows-2 gap-4', positionBasedStyles[position])}
    >
      <header className='flex flex-col gap-4'>
        <div>
          <Title heading='h2' size='xl' weight='semibold'>
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
          className='w-full rounded-2xl object-cover'
        />
        <nav className='absolute bottom-8'>
          <Button as='a' href={href} className=''>
            Mira el recorrido
          </Button>
        </nav>
      </section>
    </article>
  )
}
