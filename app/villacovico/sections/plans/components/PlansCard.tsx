'use client'

import { ImageType } from '@/types/general'
import { cn } from '@/utils/css'
import Image from 'next/image'
import { usePlansGallery } from '../store/usePlansGallery'
import { PlanType } from '../types'

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
  left: '',
  right: '',
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
  const openGallery = usePlansGallery((state) => state.openGallery)

  return (
    <article
      id={id}
      className={cn(
        'grid min-h-screen w-full shrink-0 grid-cols-2 gap-4',
        orientationBasedStyles[orientation]
      )}
    >
      <header>
        <div>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
        </div>
        <p>{description}</p>
      </header>
      <section>
        <Image src={bg.src} alt={bg.alt} width={bg.width} height={bg.height} />
        <a href={downloadLink} target='_blank' rel='noopener noreferrer'>
          Descarga contenido
        </a>
        <button onClick={() => openGallery(id)}>Ver galería</button>
      </section>
    </article>
  )
}
