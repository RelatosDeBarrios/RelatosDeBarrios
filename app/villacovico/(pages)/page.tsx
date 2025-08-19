import DocumentarySection from '../components/DocumentarySection'
import DownloadSection from '../components/DownloadSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PhotoArchive from '../components/PhotoArchive'
import VirtualTours from '../components/VirtualTours'

export default function Home() {
  return (
    <main className='min-h-screen'>
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
