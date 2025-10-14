import { VirtualTourCard } from './components/VirutalTourCard'
import { VIRTUAL_TOUR } from './content'

const { cards, id } = VIRTUAL_TOUR

export function VirtualTour() {
  return (
    <section id={id} className='h-screen w-full'>
      <div className='grid h-full grid-cols-2 gap-10 py-20'>
        {Object.values(cards).map((card, index) => (
          <VirtualTourCard
            key={card.id}
            position={index % 2 === 0 ? 'top' : 'bottom'}
            id={card.id}
            title={card.title}
            subTitle={card.subTitle}
            description={card.description}
            href={card.href}
            bg={card.bg}
          />
        ))}
      </div>
    </section>
  )
}
