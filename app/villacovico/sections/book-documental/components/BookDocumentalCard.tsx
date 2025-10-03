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
    <a href={href} className='relative'>
      <article id={id} className='grid aspect-square grid-cols-1 gap-6 md:grid-cols-2'>
        <header>
          <div>
            <Title heading='h2' size='xl' weight='semibold'>
              {title}
            </Title>
            <h3>{subTitle}</h3>
          </div>
          <Paragraph>{description}</Paragraph>
        </header>
        <section>
          <Button as='button'>Ver</Button>
        </section>
        <Image src={bg.src} alt={bg.alt} width={bg.width} height={bg.height} />
      </article>
    </a>
  )
}
