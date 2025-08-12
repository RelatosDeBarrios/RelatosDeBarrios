import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface UseSubmitButtonAnimationProps {
  states: {
    isPending: boolean
    isSuccess: boolean | null
    isError: boolean
    idle?: boolean
  }
}

export const useSubmitButtonAnimation = ({
  states: { isPending, isSuccess, isError, idle = false },
}: UseSubmitButtonAnimationProps) => {
  const btn = useRef<HTMLButtonElement | null>(null)
  const shine = useRef<HTMLSpanElement | null>(null)
  const fill = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      if (!btn.current || !shine.current || !fill.current) return

      // Always kill previous tweens before starting a new one
      gsap.killTweensOf(fill.current)
      gsap.killTweensOf(shine.current)

      // Get the current xPercent (so we can animate from the current position)
      let currentX: number
      // Decide target values based on state
      let targetX: number
      let targetColor: string
      let duration: number

      if (isPending) {
        targetX = 85
        targetColor = '#05df72'
        duration = 5
      } else if (isSuccess) {
        currentX = gsap.getProperty(fill.current, 'xPercent') as number
        targetX = 100
        targetColor = 'green'
        // Duration proportional to distance for smoothness
        duration = Math.max(1, (Math.abs(100 - (currentX ?? 0)) / 100) * 1)
      } else if (isError) {
        currentX = gsap.getProperty(fill.current, 'xPercent') as number
        targetX = -100
        targetColor = 'red'
        duration = Math.max(1, (Math.abs(-100 - (currentX ?? 0)) / 185) * 0.35)
      } else {
        // Fallback
        targetX = 0
        targetColor = '#05df72'
        duration = 0
      }

      // Animate to the new state
      gsap.to(fill.current, {
        xPercent: targetX,
        backgroundColor: targetColor,
        duration,
        ease: 'power2.inOut',
      })

      // Shine animation (only when pending)
      if (isPending) {
        gsap.to(shine.current, {
          xPercent: 200,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: -0.1,
        })
      } else {
        // Reset shine position and opacity when not pending
        gsap.set(shine.current, {
          xPercent: -100,
          opacity: 0,
        })
      }
    },
    { dependencies: [isPending, isSuccess, isError, idle], scope: btn }
  )

  return {
    btnRef: btn,
    shineRef: shine,
    fillRef: fill,
  }
}
