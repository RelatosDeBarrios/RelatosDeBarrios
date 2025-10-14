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
      <main className='flex min-h-screen flex-col gap-10 px-4 pb-10 md:gap-14 md:px-6 xl:gap-26 xl:px-10'>
        <Hero />
        <VisualArchive />
        <Quote position={1} />
        <Plans />
        <Quote position={2} />
        <VirtualTour />
        <Quote position={3} />
        <BookDocumental />
      </main>
      <Footer />
    </>
  )
}
