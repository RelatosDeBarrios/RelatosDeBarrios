'use client'

import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  useGSAP(() => {})

  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-[#3d687e] via-[#4f677f] to-[#29736a]'></div>

      <div className='relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid min-h-screen grid-cols-1 items-center gap-8 py-20 lg:grid-cols-12'>
          <div className='space-y-8 lg:col-span-8'>
            {/* Main title with creative typography */}
            <div className='creative-text-layout'>
              <h1 className='font-serif text-8xl leading-none font-bold text-white'>
                <span className='hero-title-line block'>Villa</span>
                <span className='floating-element hero-title-line block text-[#bfa647]'>
                  Covico
                </span>
              </h1>
            </div>

            <div className='max-w-3xl space-y-6'>
              <p className='hero-description font-sans text-lg leading-relaxed text-white/80 md:text-xl'>
                &quot;Relatos de Barrios: Villa Covico&quot; es un proyecto que
                pone en valor la memoria cotidiana y el patrimonio ferroviario
                de la Villa Covico en Coquimbo, Chile.
              </p>

              <p className='hero-description font-sans text-base leading-relaxed text-white/70 md:text-lg'>
                A través de testimonios orales, archivos visuales y relatos
                personales de sus habitantes, se reconstruye la historia del
                barrio como un espacio habitado profundamente vinculado al
                ferrocarril.
              </p>

              <p className='hero-description font-sans text-base leading-relaxed text-white/70 md:text-lg'>
                El proyecto destaca cómo la vivienda ferroviaria no solo
                representó infraestructura habitacional, sino también un núcleo
                comunitario que articuló dinámicas sociales, culturales y
                urbanas. Este segundo volumen de la colección Relatos de Barrios
                busca preservar, visibilizar y resignificar el legado histórico
                y afectivo del barrio, relevando la importancia de la memoria
                local en la construcción del patrimonio regional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
