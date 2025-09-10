export const Background = () => {
  return (
    <div aria-hidden className='fixed inset-0 -z-10 min-h-screen overflow-hidden'>
      <div className='from-hub-secondary to-hub-background absolute -top-1/5 right-0 left-0 mx-auto aspect-square scale-150 rounded-full bg-gradient-to-b to-75% blur-2xl not-landscape:h-dvh md:-top-1/3 md:container md:scale-100'></div>
      <svg className='min-h-screen min-w-screen opacity-25 mix-blend-difference' viewBox='0 0 1600 1600'>
        <filter id='noise-filter'>
          <feTurbulence baseFrequency='2'></feTurbulence>
        </filter>
        <rect width='100%' height='100%' filter='url(#noise-filter)'></rect>
      </svg>
    </div>
  )
}
