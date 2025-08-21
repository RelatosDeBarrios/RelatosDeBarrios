'use client'

import { Download, FileText, ImageIcon, Map } from 'lucide-react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DownloadSection() {
  // useGSAP(() => {
  //   // Animate download cards with stagger
  //   gsap.fromTo(
  //     '.download-card',
  //     { y: 80, opacity: 0, scale: 0.9 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       scale: 1,
  //       duration: 1,
  //       stagger: 0.2,
  //       ease: 'power3.out',
  //       scrollTrigger: {
  //         trigger: '.download-cards-container',
  //         start: 'top 70%',
  //       },
  //     }
  //   )
  // })

  const downloadItems = [
    {
      title: 'Isométricas',
      description: 'Dibujos isométricos de las viviendas ferroviarias',
      icon: <Map className='h-8 w-8' />,
      count: 'PDF',
      color: 'text-[#3D687E]',
      bgColor: 'bg-[#3D687E]',
    },
    {
      title: 'Planos Generales',
      description: 'Planimetrías y planos arquitectónicos originales',
      icon: <FileText className='h-8 w-8' />,
      count: 'PDF',
      color: 'text-[#995D59]',
      bgColor: 'bg-[#995D59]',
    },
    {
      title: 'Ilustraciones',
      description: 'Ilustraciones históricas y documentales',
      icon: <ImageIcon className='h-8 w-8' />,
      count: 'JPG',
      color: 'text-[#BFA647]',
      bgColor: 'bg-[#BFA647]',
    },
  ]

  return (
    <section id='laminas' className='bg-white py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-24'>
          <h2 className='download-title font-serif text-6xl leading-none font-bold text-[#3D687E] md:text-7xl lg:text-8xl'>
            Láminas
            <br />
            <span className='text-[#995D59]'>Descargables</span>
          </h2>
          <p className='download-description mt-2 max-w-prose font-sans text-xl text-gray-600 md:text-2xl'>
            Accede a planos, ilustraciones y documentos técnicos que documentan
            el patrimonio arquitectónico
          </p>
        </div>

        <div className='download-cards-container space-y-16'>
          {downloadItems.map((item, index) => (
            <div key={index} className={`download-card flex gap-8`}>
              <div className={`w-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className='group relative h-full cursor-pointer'>
                  <div className='absolute inset-0 rotate-1 transform rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 transition-transform group-hover:rotate-2'></div>
                  <div className='relative h-full rounded-2xl bg-white p-8 shadow-lg'>
                    <div className='flex items-start justify-between'>
                      <span className='rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500'>
                        {item.count}
                      </span>
                    </div>

                    <h3 className='mb-4 font-serif text-3xl font-bold text-gray-900'>
                      {item.title}
                    </h3>

                    <p className='mb-8 font-sans text-lg leading-relaxed text-gray-600'>
                      {item.description}
                    </p>

                    <button
                      className={`${item.bgColor} flex items-center gap-3 rounded-xl px-8 py-4 font-medium text-white transition-all hover:scale-105`}
                    >
                      <Download className='h-5 w-5' />
                      Descargar Colección
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`shrink-0 lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className='relative'>
                  <Image
                    width={600}
                    height={600}
                    src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                    alt={item.title}
                    className='download-image h-80 w-full rounded-2xl object-cover shadow-lg'
                  />
                  <div
                    className={`absolute inset-0 ${item.bgColor} rounded-2xl opacity-20`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
