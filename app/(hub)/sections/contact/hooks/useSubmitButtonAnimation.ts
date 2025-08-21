import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface UseSubmitButtonAnimationProps {
  states: {
    isPending: boolean
    isSuccess: boolean
    isError: boolean
    idle?: boolean
  }
}

export const useSubmitButtonAnimation = ({
  states: { isPending, isSuccess, isError, idle },
}: UseSubmitButtonAnimationProps) => {
  const btn = useRef<HTMLButtonElement | null>(null)
  const shine = useRef<HTMLSpanElement | null>(null)
  const fill = useRef<HTMLSpanElement | null>(null)
  const text = useRef<HTMLSpanElement | null>(null)
  const shineTl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!btn.current || !shine.current || !fill.current || !text.current)
        return

      // Kill previous tweens/timelines before starting new ones
      gsap.killTweensOf(fill.current)
      gsap.killTweensOf(shine.current)
      gsap.killTweensOf(text.current)
      shineTl.current?.kill()
      shineTl.current = null

      // Get button dimensions for circle sizing
      const buttonRect = btn.current.getBoundingClientRect()
      const buttonWidth = buttonRect.width

      // Defaults
      let targetSize = 0
      let duration = 0.6

      if (isPending) {
        targetSize = buttonWidth * 0.7 // 70% of button width
        duration = 0.8
      } else if (isSuccess) {
        targetSize = buttonWidth * 1.5 // 150% of button width
        duration = 0.8

        // Text transition animation for success state
        gsap.to(text.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.2,
          ease: 'power2.inOut',
        })
      } else if (isError) {
        targetSize = 0
        duration = 0.35
      }

      gsap.to(fill.current, {
        width: targetSize,
        height: targetSize, // Keep it circular
        duration,
        ease: 'power2.inOut',
      })

      // Shine animation (pending only): pulsing inner circle
      if (isPending) {
        gsap.to(shine.current, {
          width: '100%',
          height: '100%',
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'power2.out',
        })
      }
    },
    { dependencies: [isPending, isSuccess, isError, idle] }
  )

  return {
    btnRef: btn,
    shineRef: shine,
    fillRef: fill,
    textRef: text,
  }
}
