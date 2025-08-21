'use client'

import { UI } from '@/content/ui'
import { cn } from '@/utils/css'
import Link from 'next/link'
import { useRef } from 'react'
import Markdown from 'react-markdown'

interface ProjectCardProps {
  title: string
  videoSrc?: string
  posterSrc?: string
  href: URL | string
  disabled?: boolean
  badge?: React.ReactNode
}

export const ProjectCard = ({
  title,
  videoSrc,
  posterSrc,
  badge,
  href,
  disabled,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const Element = disabled ? 'div' : Link
  return (
    <Element
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      href={href}
      className={cn(
        'ring-hub-accent/50 group relative aspect-video w-full cursor-pointer content-end overflow-hidden rounded-2xl p-8 transition-all hover:ring-2 md:w-md',
        {
          'bg-hub-primary/10': !videoSrc,
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
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-hard-light transition-opacity group-hover:opacity-40'
        />
      )}
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
