import { Play, Eye, Navigation, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function VirtualTours() {
  const tours = [
    {
      title: 'Recorrido 360° Exterior',
      description:
        'Explora los espacios exteriores de Villa Covico y su entorno',
      duration: 'Interactivo',
      icon: <Navigation className='h-6 w-6' />,
      thumbnail:
        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      link: 'https://app.cloudpano.com/tours/EieASvgq8',
      color: 'bg-[#3D687E] hover:bg-[#4F677F]',
    },
    {
      title: 'Recorrido 360° Interior',
      description: 'Recorre el interior de las viviendas',
      duration: 'Interactivo',
      icon: <Eye className='h-6 w-6' />,
      thumbnail:
        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      link: 'https://app.cloudpano.com/tours/rHmDzjHtr?sceneId=h1gLeY0Nzh7',
      color: 'bg-[#29736A] hover:bg-[#995D59]',
    },
  ]

  return (
    <section id='recorridos' className='bg-white py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-24 grid grid-cols-1 items-end gap-16 lg:grid-cols-2'>
          <div>
            <h2 className='font-serif text-6xl leading-none font-bold text-[#29736A] md:text-7xl lg:text-8xl'>
              Recorridos
              <br />
              <span className='text-[#BFA647]'>Virtuales</span>
            </h2>
          </div>
          <div className='lg:pb-4'>
            <div className='mb-6 font-serif text-2xl text-[#3D687E] italic md:text-3xl'>
              &quot;Lorem ipsum dolor sit&quot;
            </div>
            <p className='font-sans text-xl leading-relaxed text-gray-600'>
              Experimenta Villa Covico como nunca antes. Recorre digitalmente
              los espacios patrimoniales
            </p>
          </div>
        </div>

        <div className='space-y-16'>
          {tours.map((tour, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:text-right' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className='group relative cursor-pointer'>
                  <div className='absolute inset-0 -rotate-1 transform rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 transition-transform group-hover:-rotate-2'></div>
                  <div className='group-hover:shadow-3xl relative overflow-hidden rounded-3xl shadow-2xl transition-shadow'>
                    <Image
                      width={600}
                      height={600}
                      src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                      alt={tour.title}
                      className='h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100'>
                      <div className='transform rounded-full bg-white/95 p-6 text-gray-800 transition-colors group-hover:scale-110 hover:bg-white'>
                        <Play className='h-12 w-12' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-8`}
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-xl bg-gray-100 p-3 text-gray-700'>
                    {tour.icon}
                  </div>
                  <span className='rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500'>
                    {tour.duration}
                  </span>
                </div>

                <h3 className='font-serif text-4xl leading-tight font-bold text-gray-900 md:text-5xl'>
                  {tour.title}
                </h3>

                <p className='font-sans text-xl leading-relaxed text-gray-600'>
                  {tour.description}
                </p>

                <a
                  href={tour.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`inline-flex items-center gap-3 ${tour.color} rounded-xl px-8 py-4 text-lg font-medium text-white no-underline transition-all hover:scale-105`}
                >
                  <ExternalLink className='h-5 w-5' />
                  Iniciar Recorrido
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
