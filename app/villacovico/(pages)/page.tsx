import DocumentarySection from '../components/DocumentarySection'
import DownloadSection from '../components/DownloadSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PhotoArchive from '../components/PhotoArchive'
import VirtualTours from '../components/VirtualTours'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col gap-10 px-10 pt-24 pb-10'>
      <Header />
      <Hero />
      <DownloadSection />
      <PhotoArchive />
      <VirtualTours />
      <DocumentarySection />
      <Footer />
    </main>
  )
}
