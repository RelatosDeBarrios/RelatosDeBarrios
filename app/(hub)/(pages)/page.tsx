import { Header } from '@/hub/components/Header'
import { Footer } from '@/hub/components/Footer'
import { Hero } from '../sections/hero/components/Hero'
import { About } from '../sections/about/components/About'
import { Team } from '../sections/team/components/Team'
import { Contact } from '../sections/contact/components/Contact'

export default function Home() {
  return (
    <>
      <Header>
        <Hero />
      </Header>
      <main className='mx-auto grow content-center'>
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
