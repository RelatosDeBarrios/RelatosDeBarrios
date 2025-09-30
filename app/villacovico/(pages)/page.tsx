import { Hero } from '@/covico/sections/hero/hero'
import { VisualArchive } from '@/covico/sections/visual-archive/visual-archive'
import { Footer } from '@/covico/sections/footer/footer'
import { Quote } from '../sections/quote/quote'
import { Plans } from '../sections/plans/plans'

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col gap-26 px-10 pb-10'>
        <Hero />
        <VisualArchive />
        <Quote position={1} />
        <Plans />
        <Quote position={2} />
        {/* 3D */}
        <div className='h-screen w-full bg-red-200'></div>
        <Quote position={1} />
        {/* Book & Documental */}
        <div className='h-screen w-full bg-blue-200'></div>
        {/* <PhotoArchive /> */}
      </main>
      <Footer />
    </>
  )
}
