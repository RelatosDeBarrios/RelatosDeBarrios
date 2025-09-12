import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

interface UseCrossfadeProps {
  durationInSeconds?: number
  currentIndex: number
  disabled?: boolean
}

export const useCrossfade = ({
  durationInSeconds = 0.5,
  currentIndex = 0,
  disabled,
}: UseCrossfadeProps) => {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0)

  const containerRef = useRef<HTMLPictureElement>(null)
  const currentImageRef = useRef<HTMLImageElement>(null)
  const nextImageRef = useRef<HTMLImageElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(currentImageRef, { opacity: 1 })
      gsap.set(nextImageRef, { opacity: 0 })
    },
    { scope: containerRef }
  )

  const performCrossfade = contextSafe(() => {
    if (disabled) {
      setDisplayedImageIndex(currentIndex)
      return
    }
    // Fade out current image, fade in target image
    gsap.to(currentImageRef, { opacity: 0, duration: durationInSeconds })
    gsap.to(nextImageRef, { opacity: 1, duration: durationInSeconds })

    setTimeout(() => {
      // After crossfade, update the displayed index and reset for next transition
      setDisplayedImageIndex(currentIndex)

      // Reset opacities: current becomes visible, target becomes hidden for next transition
      gsap.set(currentImageRef, { opacity: 1 })
      gsap.set(nextImageRef, { opacity: 0 })
    }, durationInSeconds * 1000)
  })

  useEffect(() => {
    if (currentIndex === displayedImageIndex) return
    performCrossfade()
  }, [currentIndex, performCrossfade, displayedImageIndex])

  return {
    containerRef,
    currentImageRef,
    nextImageRef,
    currentIndex: displayedImageIndex,
    nextIndex: currentIndex,
  }
}
