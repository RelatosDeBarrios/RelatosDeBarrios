import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className='relative w-full p-10'>
      <figure className='relative aspect-square w-full overflow-hidden rounded-xl'>
        <Image
          src='/villacovico/footer.webp'
          alt='Imágen de footer'
          width={1620}
          height={1620}
          className='absolute aspect-square w-full'
        />
      </figure>
    </footer>
  )
}
