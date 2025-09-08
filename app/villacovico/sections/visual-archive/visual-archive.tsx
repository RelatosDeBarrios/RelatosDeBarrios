import { VisualArchiveOpenGalleryBtn } from './components/VisualArchiveOpenGalleryBtn'
import { VisualArchiveSelector } from './components/VisualArchiveSelector'
import { VisualArchivePoster } from './components/VisualArchivePoster'
import { VISUAL_ARCHIVE } from './content'
import { GalleryItems } from './types'
import { ImageType } from '@/types/general'

export const VisualArchive = () => {
  const completeGallery = Object.fromEntries(
    Object.entries(VISUAL_ARCHIVE.cards).map(([key, card]) => [
      key,
      card.gallery,
    ])
  ) as Record<GalleryItems, ImageType[]>

  return (
    <article id='images' className='relative grid w-full grid-cols-2 gap-x-8'>
      <section className='flex flex-col items-end justify-center gap-4'>
        <h2 className='text-covico-foreground font-roboto max-w-prose text-right text-8xl font-semibold tracking-wide'>
          {VISUAL_ARCHIVE.title}
        </h2>
        <p className='text-montserrat mr-2 max-w-[250px] text-right text-2xl leading-none font-light'>
          {VISUAL_ARCHIVE.subTitle}
        </p>
      </section>

      <section className='relative'>
        <VisualArchivePoster gallery={completeGallery} />
        <nav className='absolute top-8 right-8 flex flex-col items-end gap-2'>
          {Object.values(VISUAL_ARCHIVE.cards).map((card) => (
            <VisualArchiveSelector
              key={card.id}
              id={card.id}
              archiveTitle={card.title}
            />
          ))}
        </nav>
        <VisualArchiveOpenGalleryBtn />
      </section>
    </article>
  )
}
