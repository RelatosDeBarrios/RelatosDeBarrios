import { BookDocumentalCard } from './components/BookDocumentalCard'
import { BOOK_DOCUMENTAL } from './content'

const { cards, id } = BOOK_DOCUMENTAL
export function BookDocumental() {
  return (
    <section id={id} className='h-screen py-10'>
      <div className='grid grid-cols-2 gap-4'>
        {Object.values(cards).map((card) => (
          <BookDocumentalCard
            key={card.id}
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
