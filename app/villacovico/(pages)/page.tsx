import Hero from '@/covico/sections/hero/hero'
import { VisualArchive } from '@/covico/sections/visual-archive/visual-archive'
import { Footer } from '@/covico/sections/footer/footer'
import Quote from '../sections/quote/quote'

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col gap-26 px-10 pb-10'>
        <Hero />
        <VisualArchive />
        <Quote position={1} />
        <div className='h-screen w-full bg-red-200'></div>
        <div className='h-screen w-full bg-blue-200'></div>
        {/* <PhotoArchive /> */}
      </main>
      <Footer />
    </>
  )
}
