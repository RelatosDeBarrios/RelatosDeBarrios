import { UI } from '@/content/ui'
import { cn } from '@/utils/css'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import type { Card as CardType, ImageType } from '@/types/general'

interface BaseCardProps extends Omit<CardType<''>, 'id' | 'href'> {
  className?: string
  bg: ImageType
}

type CardButtonProps = BaseCardProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant: 'button' }

type CardLinkProps = BaseCardProps &
  ComponentProps<typeof Link> & { variant: 'link' }

export type CardProps = CardButtonProps | CardLinkProps

const CARD_BASE_STYLES = [
  'bg-rengifo-gris/20',
  'border-rengifo-pastel',
  'min-h-38',
  'xl:min-h-auto',
  'group',
  'relative',
  'grid',
  'w-full',
  'max-w-lg',
  'cursor-pointer',
  'items-end',
  'overflow-clip',
  'rounded-lg',
  'border-2',
  'p-4',
  'shadow-2xl',
  'transition-transform',
  'duration-500',
  'hover:scale-105',
] as const

const getCardStyles = (className?: string) => {
  return cn([...CARD_BASE_STYLES, className])
}

const CardContent = ({ title, subTitle, bg, disabled }: BaseCardProps) => (
  <>
    {/* Disabled Overlay */}
    {disabled && (
      <div className='bg-rengifo-azul/20 absolute inset-0 z-20 hidden size-full place-items-center backdrop-blur-xs group-hover:grid'>
        <p className='text-4xl font-bold text-white'>
          {UI.messages.not_available}
        </p>
      </div>
    )}

    {/* Title */}
    <h3 className='text-shadow-rengifo-azul/20 relative z-10 text-left text-3xl leading-7 font-black text-white uppercase text-shadow-lg md:text-4xl'>
      {title}
      {subTitle && (
        <>
          <br />
          <span className='text-2xl font-medium md:text-3xl'>{subTitle}</span>
        </>
      )}
    </h3>

    {/* Background Image */}
    <Image
      alt={bg.alt}
      src={bg.src}
      width={bg.width}
      height={bg.height}
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      className='pointer-events-none absolute inset-0 size-full object-cover transition-transform delay-75 duration-700 select-none group-hover:scale-125'
    />
  </>
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardButton = ({ variant, ...buttonProps }: CardButtonProps) => {
  const { className, disabled, bg, title, subTitle, ...rest } = buttonProps

  return (
    <button className={getCardStyles(className)} disabled={disabled} {...rest}>
      <CardContent
        title={title}
        subTitle={subTitle}
        bg={bg}
        disabled={disabled}
      />
    </button>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardLink = ({ variant, ...linkProps }: CardLinkProps) => {
  const { className, disabled, bg, title, subTitle, ...rest } = linkProps

  return (
    <Link
      aria-disabled={disabled}
      className={getCardStyles(className)}
      {...rest}
    >
      <CardContent
        title={title}
        subTitle={subTitle}
        bg={bg}
        disabled={disabled}
      />
    </Link>
  )
}

export const Card = (props: CardProps) => {
  switch (props.variant || 'link') {
    case 'button': {
      // Pass all props except variant to CardButton
      return <CardButton {...(props as CardButtonProps)} />
    }
    case 'link': {
      // Pass all props except variant to CardLink
      return <CardLink {...(props as CardLinkProps)} />
    }
    default: {
      // TypeScript should prevent this, but adding for runtime safety
      throw new Error(`Invalid card variant: ${props as never}`)
    }
  }
}

export type { BaseCardProps, CardButtonProps, CardLinkProps }
