import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bg-[#4F677F] py-16 text-white'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 font-serif text-2xl font-bold'>
              Relatos de Barrios
            </h3>
            <p className='font-sans leading-relaxed text-blue-100'>
              Un proyecto de investigación y puesta en valor del patrimonio
              ferroviario y la memoria local de Villa Covico, Coquimbo.
            </p>
          </div>

          <div>
            <h4 className='mb-4 font-serif text-lg font-bold'>Navegación</h4>
            <ul className='space-y-2 font-sans text-blue-100'>
              <li>
                <a
                  href='#proyecto'
                  className='transition-colors hover:text-white'
                >
                  El Proyecto
                </a>
              </li>
              <li>
                <a
                  href='#laminas'
                  className='transition-colors hover:text-white'
                >
                  Láminas Descargables
                </a>
              </li>
              <li>
                <a
                  href='#archivo'
                  className='transition-colors hover:text-white'
                >
                  Archivo Fotográfico
                </a>
              </li>
              <li>
                <a
                  href='#recorridos'
                  className='transition-colors hover:text-white'
                >
                  Recorridos Virtuales
                </a>
              </li>
              <li>
                <a
                  href='#documental'
                  className='transition-colors hover:text-white'
                >
                  Documental y Libro
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='mb-4 font-serif text-lg font-bold'>Síguenos</h4>
            <div className='mb-6 flex gap-4'>
              <a
                href='https://www.instagram.com/relatosdebarrios/'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-lg bg-[#BFA647] p-3 transition-colors hover:bg-[#29736A]'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='mailto:relatosdebarrios@gmail.com'
                className='rounded-lg bg-[#995D59] p-3 transition-colors hover:bg-[#8C6E59]'
              >
                <Mail className='h-5 w-5' />
              </a>
            </div>

            <div className='space-y-2 text-sm text-blue-100'>
              <p>Con el apoyo de:</p>
              <p>MINCAP + ULS</p>
              <p>Y colaboradores del proyecto</p>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-blue-400/30 pt-8 text-center'>
          <p className='font-sans text-blue-200'>
            © 2024 Relatos de Barrios: Villa Covico. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
