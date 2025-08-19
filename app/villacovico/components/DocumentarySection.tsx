import { Play, Download, BookOpen, Film, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function DocumentarySection() {
  return (
    <section id='documental' className='bg-gray-50 py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-24 text-center'>
          <div className='mx-auto mb-8 max-w-4xl font-serif text-3xl leading-tight text-[#995D59] italic md:text-4xl lg:text-5xl'>
            &quot; Lorem ipsum dolor sit amet, consectetur adipiscing elit
            &quot;
          </div>
          <div className='font-sans text-lg tracking-wider text-gray-600 uppercase'>
            — lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>

        <div className='mb-20 text-center'>
          <h2 className='mb-8 font-serif text-6xl font-bold md:text-7xl lg:text-8xl'>
            <span className='text-[#3D687E]'>Documental</span>
            <br />
            <span className='text-[#BFA647]'>y Libro</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 items-start gap-20 lg:grid-cols-2'>
          {/* Sección del Documental */}
          <div className='space-y-8'>
            <div className='group relative cursor-pointer'>
              <div className='absolute inset-0 rotate-1 transform rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 transition-transform group-hover:rotate-2'></div>
              <div className='relative overflow-hidden rounded-3xl'>
                <Image
                  width={600}
                  height={600}
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Documental Villa Covico'
                  className='h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
                  <div className='transform rounded-full bg-white/95 p-8 text-gray-800 transition-colors group-hover:scale-110 hover:bg-white'>
                    <Play className='h-16 w-16' />
                  </div>
                </div>
                <div className='absolute right-6 bottom-6 left-6 text-white'>
                  <div className='mb-3 flex items-center gap-3'>
                    <Film className='h-6 w-6' />
                    <span className='text-lg font-medium'>YouTube</span>
                  </div>
                  <h3 className='font-serif text-3xl font-bold'>
                    Documental Villa Covico
                  </h3>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <p className='font-sans text-xl leading-relaxed text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
              {/* <button className='flex items-center gap-3 rounded-xl bg-[#995D59] px-8 py-4 text-lg font-medium text-white transition-all hover:scale-105 hover:bg-[#8C6E59]'> */}
              {/*   <ExternalLink className='h-5 w-5' /> */}
              {/*   Ver en YouTube */}
              {/* </button> */}
            </div>
          </div>

          {/* Sección del Libro */}
          <div className='space-y-8'>
            <div className='group relative cursor-pointer'>
              <div className='absolute inset-0 -rotate-1 transform rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 transition-transform group-hover:-rotate-2'></div>
              <div className='relative overflow-hidden rounded-3xl bg-white'>
                <Image
                  width={600}
                  height={600}
                  src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  alt='Libro Relatos de Barrios: Villa Covico'
                  className='h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            </div>

            <div className='space-y-6'>
              <p className='font-sans text-xl leading-relaxed text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>

              {/* <button className='flex w-full items-center justify-center gap-3 rounded-xl bg-[#BFA647] px-8 py-4 text-lg font-medium text-white transition-all hover:scale-105 hover:bg-[#29736A]'> */}
              {/*   <Download className='h-5 w-5' /> */}
              {/*   Descargar Libro RdB2 */}
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
