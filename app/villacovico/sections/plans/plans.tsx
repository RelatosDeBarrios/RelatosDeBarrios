import { getGallery } from '../../features/gallery/utils/getGallery'
import { PlansCard } from './components/PlansCard'
import { PlansGallery } from './components/PlansGallery'
import { PLANS } from './content'

const { cards, id } = PLANS

export function Plans() {
  const galleries = getGallery(cards, 'collection')
  const { isometrics, 'floor-plans': floorPlans } = cards

  return (
    <section id={id} className='flex min-h-screen w-full gap-4'>
      <PlansCard
        orientation='left'
        id={isometrics.id}
        title={isometrics.title}
        subTitle={isometrics.subTitle}
        description={isometrics.description}
        downloadLink={isometrics.downloadLink}
        bg={cards.isometrics.collection[0]}
      />
      <PlansCard
        orientation='right'
        id={floorPlans.id}
        title={floorPlans.title}
        subTitle={floorPlans.subTitle}
        description={floorPlans.description}
        downloadLink={floorPlans.downloadLink}
        bg={cards['floor-plans'].collection[0]}
      />

      <PlansGallery galleries={galleries} />
    </section>
  )
}
