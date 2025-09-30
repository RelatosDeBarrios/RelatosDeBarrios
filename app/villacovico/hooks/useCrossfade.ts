import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

interface UseCrossfadeImagesProps {
  durationInSeconds?: number
  currentIndex: number
  disabled?: boolean
}

export const useCrossfadeImages = ({
  durationInSeconds = 0.5,
  currentIndex = 0,
  disabled = false,
}: UseCrossfadeImagesProps) => {
  // Track which buffer is currently visible (A or B)
  const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A')
  // Track the last processed index to detect changes
  const [lastProcessedIndex, setLastProcessedIndex] = useState(currentIndex)

  // Refs for the two image buffers
  const imageA = useRef<HTMLImageElement>(null)
  const imageB = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({
    scope: containerRef,
    dependencies: [disabled],
  })

  const performCrossfade = contextSafe(() => {
    if (!imageA.current || !imageB.current) return

    const currentImage = activeBuffer === 'A' ? imageA.current : imageB.current
    const nextImage = activeBuffer === 'A' ? imageB.current : imageA.current

    const tl = gsap.timeline({
      onComplete: () => {
        // Switch active buffer
        setActiveBuffer(activeBuffer === 'A' ? 'B' : 'A')
        setLastProcessedIndex(currentIndex)
      },
    })

    // Crossfade: fade out current, fade in next
    tl.to(currentImage, { opacity: 0, duration: durationInSeconds }, 0)
    tl.to(nextImage, { opacity: 1, duration: durationInSeconds }, 0)
  })

  // Initialize on first render
  useGSAP(
    () => {
      if (!disabled && imageA.current && imageB.current) {
        // Set initial opacities: A visible, B hidden
        gsap.set(imageA.current, { opacity: 1 })
        gsap.set(imageB.current, { opacity: 0 })
      }
    },
    { scope: containerRef, dependencies: [disabled] }
  )

  useEffect(() => {
    if (disabled) {
      setLastProcessedIndex(currentIndex)
      return
    }

    // Only trigger crossfade if index actually changed
    if (currentIndex !== lastProcessedIndex) {
      performCrossfade()
    }
  }, [currentIndex, lastProcessedIndex, disabled, performCrossfade, setLastProcessedIndex])

  // Handle disabled state changes
  useEffect(() => {
    if (disabled && imageA.current && imageB.current) {
      // When disabled, show the image in buffer A and hide B
      gsap.set(imageA.current, { opacity: 1 })
      gsap.set(imageB.current, { opacity: 0 })
      setActiveBuffer('A')
      setLastProcessedIndex(currentIndex)
    }
  }, [disabled, currentIndex])

  return {
    containerRef,
    imageA,
    imageB,
    // Return the indices for each buffer
    // Active buffer shows lastProcessedIndex, inactive shows currentIndex
    imageAIndex: activeBuffer === 'A' ? lastProcessedIndex : currentIndex,
    imageBIndex: activeBuffer === 'A' ? currentIndex : lastProcessedIndex,
    activeBuffer,
  }
}
