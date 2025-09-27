import { PLANS } from './content'

const { cards, title, id } = PLANS

export default function Plans() {
  return (
    <section id={id} className=''>
      {title}
    </section>
  )
}
