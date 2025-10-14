import { OpenGalleryCard } from '@/rengifo/components/ui/OpenGalleryCard'
import { Title } from '@/rengifo/components/ui/Title'
import { YellowBar } from '@/rengifo/components/ui/YellowBar'
import { docsContent } from '@/rengifo/content/docs'
import Image from 'next/image'
import Markdown from 'react-markdown'

const { planimetries, survey } = docsContent.cards!

export const DocsSection = () => {
  return (
    <article
      id={docsContent.id}
      className='bg-rengifo-azul relative z-30 flex min-h-[180dvh] flex-col items-center justify-end overflow-y-clip'
    >
      {/* Background Image */}
      <Image
        src={docsContent.utilityImages!.bg.src}
        alt={docsContent.utilityImages!.bg.alt}
        width={docsContent.utilityImages!.bg.width}
        height={docsContent.utilityImages!.bg.height}
        sizes='100vw'
        className='pointer-events-none absolute -top-[50%] h-full w-full object-cover select-none md:-top-[40%]'
      />
      <section className='z-10 container px-4 md:px-8'>
        <div>
          <Title headingLevel='h2' className='max-w-4xl'>
            {docsContent.title}
          </Title>
          <YellowBar className='-ml-10 max-w-6xl' />
        </div>

        <section className='flex flex-col gap-8 py-10 md:py-20 xl:flex-row'>
          <div className='mx-auto flex w-full max-w-md flex-col gap-2'>
            <Markdown
              components={{
                p: (
                  props: React.HTMLAttributes<HTMLParagraphElement> & {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    node?: any
                  }
                ) => <p className='leading-tight font-light text-white md:text-lg' {...props}></p>,
              }}
            >
              {docsContent.description}
            </Markdown>
          </div>
          <section className='flex w-full items-center gap-8 not-landscape:flex-col xl:items-stretch'>
            <OpenGalleryCard
              id={planimetries.id}
              bg={planimetries.bg}
              title={planimetries.title}
              subTitle={planimetries.subTitle}
            />
            <OpenGalleryCard id={survey.id} bg={survey.bg} title={survey.title} subTitle={survey.subTitle} />
          </section>
        </section>
      </section>
      <div className='relative z-10 h-auto w-full'>
        <Image
          src={docsContent.utilityImages!.bottom.src}
          alt={docsContent.utilityImages!.bottom.alt}
          height={docsContent.utilityImages!.bottom.height}
          width={docsContent.utilityImages!.bottom.width}
          sizes='100vw'
          className='pointer-events-none w-full object-cover select-none'
        />
        <div className='to-rengifo-pastel absolute bottom-0 z-1 h-full w-full bg-gradient-to-b from-transparent from-60%'></div>
      </div>
    </article>
  )
}
