import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import '@/hub/styles/globals.css'
import { Background } from '@/hub/components/Background'
import { cn } from '@/utils/css'
import { SEO } from '@/hub/content/seo'

const noto_sans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
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
        'bg-hub-background font-noto relative flex h-full min-h-dvh flex-col px-4 antialiased',
        noto_sans.variable
      )}
    >
      <Background />
      {children}
    </body>
  )
}
