import Hero from '../sections/hero/hero'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col gap-10 px-10 pb-10'>
      <Hero />
      <div className='h-screen w-full bg-red-200'></div>
      <div className='h-screen w-full bg-blue-200'></div>
      {/* <PhotoArchive /> */}
      {/* <Footer /> */}
    </main>
  )
}
