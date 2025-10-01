import { VisualArchiveOpenGalleryBtn } from './components/VisualArchiveOpenGalleryBtn'
import { VisualArchiveSelector } from './components/VisualArchiveSelector'
import { VisualArchivePoster } from './components/VisualArchivePoster'
import { VISUAL_ARCHIVE } from './content'
import { getGallery } from '@/covico/features/gallery/utils/getGallery'
import { Title } from '../../components/ui/Title'
import { Paragraph } from '../../components/ui/Paragraph'

export const VisualArchive = () => {
  const completeGallery = getGallery(VISUAL_ARCHIVE.cards, 'gallery')

  return (
    <article id={VISUAL_ARCHIVE.id} className='relative grid w-full grid-cols-2 gap-x-8'>
      <section className='flex flex-col items-end justify-center gap-4'>
        <Title heading='h2' size='xl' weight='semibold' className='text-right'>
          {VISUAL_ARCHIVE.title}
        </Title>
        <Paragraph className='max-w-[250px] text-right'>{VISUAL_ARCHIVE.subTitle}</Paragraph>
      </section>

      <section className='relative'>
        <VisualArchivePoster gallery={completeGallery} />
        <nav className='absolute top-8 right-8 flex flex-col items-end gap-4'>
          {Object.values(VISUAL_ARCHIVE.cards).map((card) => (
            <VisualArchiveSelector key={card.id} id={card.id} archiveTitle={card.title} />
          ))}
        </nav>
        <VisualArchiveOpenGalleryBtn />
      </section>
    </article>
  )
}
