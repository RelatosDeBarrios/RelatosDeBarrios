import type { Metadata } from 'next'
import { Instrument_Sans, Montserrat, Roboto_Serif } from 'next/font/google'
import '@/covico/styles/globals.css'
import { cn } from '@/utils/css'
import { SEO } from '../content/seo'
import SmoothScroll from '../components/smooth-scroll/SmoothScroll'
import Header from '../sections/nav/header'

const robotoSerif = Roboto_Serif({
  variable: '--font-roboto-serif',
  subsets: ['latin'],
})

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
})

const monstserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['200', '300', '400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SEO.url),
  ...SEO,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body
      className={cn(
        robotoSerif.variable,
        instrumentSans.variable,
        monstserrat.variable,
        'bg-covico-background h-full antialiased'
      )}
    >
      <Header />
      <div id='smooth-wrapper'>
        <div id='smooth-content'>{children}</div>
      </div>
      <SmoothScroll />
    </body>
  )
}
