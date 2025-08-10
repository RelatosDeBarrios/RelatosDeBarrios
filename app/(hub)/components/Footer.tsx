import Link from 'next/link'
import { BRAND } from '@/content/brand'
import { Instagram, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className='mx-auto w-fit items-center space-y-2 py-6 text-center text-gray-600'>
      <p className='text-sm'>{new Date().getFullYear()} Relatos de Barrios.</p>
      <nav className='flex items-center justify-center gap-2'>
        {/* Instagram */}
        <Link
          href={BRAND.social.instagram}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Instagram size={20} strokeWidth={1.75} />
        </Link>

        {/* Mail */}
        <Link href={`mailto:${BRAND.contact_email}`}>
          <Mail size={22} strokeWidth={1.5} />
        </Link>
      </nav>
    </footer>
  )
}
