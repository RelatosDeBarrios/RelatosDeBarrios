'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PhotoArchive() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('escaneadas')

  // useGSAP(() => {
  //   // Animate repeated text with wave effect
  //   gsap.fromTo(
  //     '.repeated-text',
  //     { opacity: 0, y: 30 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 1,
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: '.repeated-text-container',
  //         start: 'top 80%',
  //       },
  //     }
  //   )
  //
  //   // Animate main title with split effect
  //   gsap.fromTo(
  //     '.archive-title-word',
  //     { y: 100, opacity: 0, rotationX: 90 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       rotationX: 0,
  //       duration: 1.2,
  //       stagger: 0.2,
  //       ease: 'power3.out',
  //       scrollTrigger: {
  //         trigger: '.archive-title',
  //         start: 'top 80%',
  //       },
  //     }
  //   )
  //
  //   // Animate category buttons
  //   gsap.fromTo(
  //     '.category-button',
  //     { scale: 0, opacity: 0 },
  //     {
  //       scale: 1,
  //       opacity: 1,
  //       duration: 0.6,
  //       stagger: 0.1,
  //       ease: 'back.out(1.7)',
  //       scrollTrigger: {
  //         trigger: '.category-buttons',
  //         start: 'top 80%',
  //       },
  //     }
  //   )
  //
  //   // Animate photo grid with masonry effect
  //   gsap.fromTo(
  //     '.photo-card',
  //     { y: 100, opacity: 0, scale: 0.8 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       scale: 1,
  //       duration: 0.8,
  //       stagger: {
  //         amount: 1.2,
  //         from: 'random',
  //       },
  //       ease: 'power2.out',
  //       scrollTrigger: {
  //         trigger: '.photo-grid',
  //         start: 'top 70%',
  //       },
  //     }
  //   )
  // })
  //
  const photoCategories = [
    { id: 'escaneadas', name: 'Fotos Escaneadas', color: 'bg-[#995D59]' },
    { id: 'covico', name: 'Fotógrafo COVICO', color: 'bg-[#BFA647]' },
    { id: 'aereas', name: 'Tomas Aéreas', color: 'bg-[#29736A]' },
  ]

  const photos = [
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Estación Villa Covico - 1952',
      description:
        'Vista principal de la estación en sus primeros años de funcionamiento',
      category: 'escaneadas',
    },
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Trabajadores Ferroviarios - 1958',
      description: 'Grupo de trabajadores en el taller de reparaciones',
      category: 'covico',
    },
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Viviendas Ferroviarias - 1960',
      description: 'Conjunto habitacional para empleados del ferrocarril',
      category: 'escaneadas',
    },
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Tren de Pasajeros - 1965',
      description: 'Locomotora arribando a la estación con pasajeros',
      category: 'escaneadas',
    },
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Familia Ferroviaria - 1962',
      description: 'Retrato de familia en el patio de una vivienda ferroviaria',
      category: 'covico',
    },
    {
      src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      title: 'Vista Aérea - 1970',
      description: 'Panorámica del barrio y sus conexiones ferroviarias',
      category: 'aereas',
    },
  ]

  const filteredPhotos =
    selectedCategory === 'todas'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory)

  return (
    <section id='archivo' className='bg-gray-50 py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-24'>
          <div className='repeated-text-container mb-16 space-y-4 text-center'>
            <div className='repeated-text font-serif text-lg tracking-wider text-[#995D59] uppercase md:text-xl'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>

          <h2 className='archive-title mb-8 text-center font-serif text-6xl font-bold md:text-7xl lg:text-8xl'>
            <span className='archive-title-word block text-[#3D687E]'>
              Archivo
            </span>
            <span className='archive-title-word block text-[#29736A]'>
              Fotográfico
            </span>
          </h2>

          <p className='mx-auto max-w-4xl text-center font-sans text-xl leading-relaxed text-gray-600 md:text-2xl'>
            Una colección de fotografías históricas que documentan la vida
            cotidiana y el desarrollo urbano de Villa Covico
          </p>
        </div>

        <div className='category-buttons mb-16 flex flex-wrap justify-center gap-6'>
          {photoCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-button rounded-full px-8 py-4 text-lg font-medium transition-all hover:scale-105 ${
                selectedCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 shadow-md hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='photo-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className='photo-card group cursor-pointer'
              onClick={() => setSelectedImage(index)}
            >
              <div className='relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-105 hover:shadow-2xl'>
                <Image
                  width={600}
                  height={600}
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt={photo.title}
                  className='h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='absolute right-6 bottom-6 left-6 text-white'>
                    <h3 className='mb-2 font-serif text-xl font-bold'>
                      {photo.title}
                    </h3>
                    <p className='font-sans text-sm leading-relaxed opacity-90'>
                      {photo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para imagen ampliada */}
        {selectedImage !== null && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'>
            <div className='relative max-h-full max-w-4xl'>
              <button
                onClick={() => setSelectedImage(null)}
                className='absolute top-4 right-4 z-10 text-white hover:text-gray-300'
              >
                <X size={32} />
              </button>

              <Image
                width={600}
                height={600}
                src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                alt={photos[selectedImage].title}
                className='max-h-full max-w-full object-contain'
              />

              <div className='absolute right-4 bottom-4 left-4 text-white'>
                <h3 className='mb-2 font-serif text-2xl font-bold'>
                  {photos[selectedImage].title}
                </h3>
                <p className='font-sans text-lg'>
                  {photos[selectedImage].description}
                </p>
              </div>

              {/* Navegación */}
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage > 0 ? selectedImage - 1 : photos.length - 1
                  )
                }
                className='absolute top-1/2 left-4 -translate-y-1/2 transform text-white hover:text-gray-300'
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage < photos.length - 1 ? selectedImage + 1 : 0
                  )
                }
                className='absolute top-1/2 right-4 -translate-y-1/2 transform text-white hover:text-gray-300'
              >
                <ChevronRight size={48} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
