import Image from 'next/image'
import { footerContent } from '@/rengifo/content/footer'
import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Logo } from '@/rengifo/components/ui/Logo'

type IconMap = {
  [key: string]: LucideIcon
}

const ICONS: IconMap = {
  Instagram,
  Facebook,
  Youtube,
  Mail,
}

export const Footer = () => {
  return (
    <footer id={footerContent.id} className='relative -mt-3 w-full overflow-clip'>
      <div
        aria-hidden
        className='to-rengifo-azul-darker absolute top-0 z-1 size-full bg-gradient-to-b from-transparent'
      ></div>
      <Image
        src={footerContent.utilityImages.bg.src}
        alt={footerContent.utilityImages.bg.alt}
        width={footerContent.utilityImages.bg.width}
        height={footerContent.utilityImages.bg.height}
        className='pointer-events-none absolute top-0 z-0 h-full w-full object-cover object-top select-none'
      />
      <section className='relative z-10 container mx-auto space-y-4 px-4 pt-24 pb-8'>
        {/* Logo */}
        <Logo className='text-rengifo-pastel mx-auto w-fit max-w-lg' />
        {/* Collaborators */}
        <ul className='flex flex-wrap items-center justify-center'>
          {footerContent.credits.collaborators.map(({ src, alt, width, height }) => (
            <li key={src} className='size-fit'>
              <Image
                src={src}
                alt={alt}
                height={height}
                width={width}
                className='aspect-auto max-h-16 w-fit md:max-h-24'
              />
            </li>
          ))}
        </ul>
        {/* Text */}
        <div className='text-center text-sm leading-tight text-white md:text-base'>
          <p>{footerContent.title}</p>
          {/* Dev */}
          <Link
            href={footerContent.credits.developer?.href || '/'}
            target='_blank'
            rel='noopener noreferrer'
            className='text-rengifo-amarillo hover:text-rengifo-pastel transition-colors duration-300'
          >
            {footerContent.credits.developer?.text}
          </Link>
        </div>
        {/* RRSS */}
        <nav className='mx-auto flex w-fit gap-4 text-white'>
          {footerContent.socialLinks.map((socialLink) => {
            const IconComponent = ICONS[socialLink.icon]
            return (
              <Link
                aria-label={socialLink.name}
                href={socialLink.href}
                key={socialLink.id}
                rel='noopener noreferrer'
                target='_blank'
              >
                {IconComponent && (
                  <IconComponent
                    size={28}
                    strokeWidth={1.2}
                    className='hover:text-rengifo-amarillo transition-colors duration-150'
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </section>
    </footer>
  )
}
