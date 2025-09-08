'use client'

import { UI } from '@/content/ui'
import { ImageType, VideoType } from '@/types/general'
import { cn } from '@/utils/css'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import Markdown from 'react-markdown'

interface ProjectCardProps {
  title: string
  background?: ImageType | VideoType
  href: URL | string
  disabled?: boolean
  badge?: React.ReactNode
}

export const ProjectCard = ({
  title,
  background,
  badge,
  href,
  disabled,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const Element = disabled ? 'div' : Link

  const handleVideoPlay = () => {
    if (videoRef.current && (background as VideoType).autoplay) {
      videoRef.current.play()
    }
  }

  const handleVideoPause = () => {
    if (videoRef.current && (background as VideoType).autoplay) {
      videoRef.current.pause()
    }
  }

  return (
    <Element
      onMouseEnter={handleVideoPlay}
      onMouseLeave={handleVideoPause}
      href={href}
      className={cn(
        'ring-hub-accent/50 group relative aspect-video w-full cursor-pointer content-end overflow-hidden rounded-2xl p-8 transition-all hover:ring-2 md:w-md',
        {
          'bg-hub-primary/10': !background,
        }
      )}
    >
      {disabled && (
        <div className='bg-hub-primary/10 absolute inset-0 z-10 flex items-center justify-center transition-opacity group-hover:opacity-100 landscape:opacity-0'>
          <span className='text-hub-accent text-2xl font-bold'>
            {UI.messages.coming_soon}
          </span>
        </div>
      )}
      {!!badge && badge}

      {background && <Background ref={videoRef} background={background} />}

      <Markdown
        components={{
          h2: ({ ...props }) => (
            <h2
              {...props}
              className='text-hub-text relative w-full max-w-xs text-4xl leading-none'
            />
          ),
        }}
      >
        {title}
      </Markdown>
    </Element>
  )
}

interface BackgroundProps {
  background: ImageType | VideoType
  ref: React.RefObject<HTMLVideoElement | null>
}

const Background = ({ background, ref }: BackgroundProps) => {
  if ('src' in background && (background as VideoType).autoplay) {
    const video = background as VideoType
    return (
      <video
        ref={ref}
        src={video.src}
        loop={video.loop}
        muted={video.muted}
        playsInline
        preload={video.preload}
        className='absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-hard-light transition-opacity group-hover:opacity-40'
      />
    )
  }

  if ('src' in background && (background as ImageType).alt) {
    const image = background as ImageType

    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className='absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity group-hover:opacity-40'
      />
    )
  }

  return null
}
