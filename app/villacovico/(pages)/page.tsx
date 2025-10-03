import { Hero } from '@/covico/sections/hero/hero'
import { VisualArchive } from '@/covico/sections/visual-archive/visual-archive'
import { Footer } from '@/covico/sections/footer/footer'
import { Quote } from '../sections/quote/quote'
import { Plans } from '../sections/plans/plans'
import { VirtualTour } from '../sections/virtual-tour/virtual-tour'
import { BookDocumental } from '../sections/book-documental/book-documental'

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col gap-26 px-10 pb-10'>
        <Hero />
        <VisualArchive />
        <Quote position={1} />
        <Plans />
        <Quote position={2} />
        <VirtualTour />
        <Quote position={1} />
        <BookDocumental />
      </main>
      <Footer />
    </>
  )
}
