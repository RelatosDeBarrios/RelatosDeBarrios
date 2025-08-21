import { Background } from '@/app/(hub)/components/Background'
import Image from 'next/image'

interface EmailTemplateProps {
  name: string
  commentary: string
  contribution:
    | 'Conjunto Habitacional Rengifo'
    | 'Villa Covico'
    | 'Sin material para aportar'
    | string
}

export const EmailTemplate = ({
  name,
  commentary,
  contribution,
}: EmailTemplateProps) => {
  return (
    <div className='h-full min-h-screen w-full'>
      <Background />
      <div className='bg-hub-background/60 border-hub-border m-auto mt-10 max-w-2xl rounded-xl border p-8'>
        <header>
          <Image
            src='/hub/favicon.png'
            alt='Logotipo de Relatos de Barrios'
            width={200}
            height={200}
            className='mx-auto size-20'
          />
          <p className='text-hub-text text-sm'>
            <strong>Aporte:</strong> {contribution}
          </p>
          <p className='text-hub-text my-4 text-xl'>
            Mensaje de <strong>{name}</strong>
          </p>
        </header>
        <main className='bg-hub-background/40 rounded-lg p-4'>
          <p className='text-pretty'>{commentary}</p>
        </main>
        <footer className='mx-auto mt-8 max-w-prose'>
          <p className='text-hub-text text-center text-sm'>
            Responde directamente a {name} presionando el botón de responder de
            Gmail
          </p>
        </footer>
      </div>
    </div>
  )
}
