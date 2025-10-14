import { getGallery } from '../../features/gallery/utils/getGallery'
import { PlansCard } from './components/PlansCard'
import { PlansGallery } from './components/PlansGallery'
import { PLANS } from './content'

const { cards, id } = PLANS

export function Plans() {
  const galleries = getGallery(cards, 'collection')
  const { isometrics, 'floor-plans': floorPlans } = cards

  return (
    <section id={id} className='h-screen w-full'>
      <div className='grid h-full grid-rows-2 gap-6 xl:grid-cols-2 xl:grid-rows-1 xl:gap-10 xl:py-20'>
        <PlansCard
          orientation='left'
          id={isometrics.id}
          title={isometrics.title}
          subTitle={isometrics.subTitle}
          description={isometrics.description}
          downloadLink={isometrics.downloadLink}
          bg={isometrics.collection[7]}
        />
        <PlansCard
          orientation='right'
          id={floorPlans.id}
          title={floorPlans.title}
          subTitle={floorPlans.subTitle}
          description={floorPlans.description}
          downloadLink={floorPlans.downloadLink}
          bg={floorPlans.collection[1]}
        />
      </div>
      <PlansGallery galleries={galleries} />
    </section>
  )
}
