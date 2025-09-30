import { ImageType } from '@/types/general'
import { PLANS } from './content'

const { cards, title, id } = PLANS

export function Plans() {
  return (
    <section id={id} className='flex gap-4 min-h-screen w-full'>
      {title}
    </section>
  )
}

