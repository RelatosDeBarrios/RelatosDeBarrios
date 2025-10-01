import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { getNextIndex } from '@/utils/circular'

gsap.registerPlugin(useGSAP)

interface VisualArchiveCrossfadeProps {
  crossfadeDuration?: number
  intervalDuration: number
  listLength: number
  disabled?: boolean
}

const getBufferIndices = (activeBufferIndex: number, visibleIndex: number, nextIndex: number) => {
  const isFirstBufferActive = activeBufferIndex === 0
  return {
    imageAIndex: isFirstBufferActive ? visibleIndex : nextIndex,
    imageBIndex: isFirstBufferActive ? nextIndex : visibleIndex,
  }
}

export const useVisualArchiveCrossfade = ({
  crossfadeDuration = 0.5,
  intervalDuration = 5,
  listLength,
  disabled = false,
}: VisualArchiveCrossfadeProps) => {
  const [activeBufferIndex, setActiveBufferIndex] = useState(0)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(0)

  const imageA = useRef<HTMLImageElement>(null)
  const imageB = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({
    scope: containerRef,
    dependencies: [disabled],
  })

  const resetBuffersToInitialState = contextSafe(() => {
    if (!imageA.current || !imageB.current) return
    gsap.set(imageA.current, { opacity: 1 })
    gsap.set(imageB.current, { opacity: 0 })
  })

  const performCrossfade = contextSafe(() => {
    const images = [imageA.current, imageB.current]
    if (!images[0] || !images[1]) return

    const currentImage = images[activeBufferIndex]
    const nextImage = images[1 - activeBufferIndex]

    gsap
      .timeline({
        onComplete: () => {
          setActiveBufferIndex((prev) => 1 - prev)
          setVisibleIndex(nextIndex)
        },
      })
      .to(currentImage, { opacity: 0, duration: crossfadeDuration }, 0)
      .to(nextImage, { opacity: 1, duration: crossfadeDuration }, 0)
  })

  useGSAP(
    () => {
      if (!disabled) {
        resetBuffersToInitialState()
      }
    },
    { scope: containerRef, dependencies: [disabled] }
  )

  useEffect(() => {
    if (!imageA.current || !imageB.current) return

    if (disabled) {
      resetBuffersToInitialState()
      setActiveBufferIndex(0)
      setVisibleIndex(nextIndex)
      return
    }

    if (nextIndex !== visibleIndex) {
      performCrossfade()
    }
  }, [nextIndex, visibleIndex, disabled, performCrossfade, resetBuffersToInitialState])

  useEffect(() => {
    if (disabled) return
    const interval = setInterval(() => {
      setNextIndex((prevIndex) => getNextIndex(prevIndex, listLength))
    }, intervalDuration * 1000)
    return () => clearInterval(interval)
  }, [disabled, intervalDuration, listLength])

  const activeBuffer = activeBufferIndex === 0 ? 'A' : 'B'

  return {
    containerRef,
    imageA,
    imageB,
    ...getBufferIndices(activeBufferIndex, visibleIndex, nextIndex),
    activeBuffer,
  }
}
