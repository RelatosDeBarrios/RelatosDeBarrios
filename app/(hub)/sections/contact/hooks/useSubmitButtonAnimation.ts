import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Phase } from './useContactSubmit'

interface UseSubmitButtonAnimationProps {
  formPhase: Phase
  isPending?: boolean
}

export const useSubmitButtonAnimation = ({
  formPhase,
  isPending = false,
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

      const styles = {
        validating: {
          targetSize: buttonWidth * 0.4,
          duration: 1,
        },
        uploading: {
          targetSize: buttonWidth * 0.8,
          duration: 2,
        },
        submitting: {
          targetSize: buttonWidth * 0.9,
          duration: 1,
        },
        success: {
          targetSize: buttonWidth * 1.5, // 150% of button width
          duration: 1,
        },
        error: {
          targetSize: 0, // Collapse to zero
          duration: 0.35,
        },
        idle: {
          targetSize: 0, // Collapse to zero
          duration: 0.35,
        },
      }

      if (formPhase === 'success') {
        // Text transition animation for success state
        gsap.to(text.current, {
          opacity: 1,
          duration: 0.3,
          delay: 0.2,
          ease: 'power2.inOut',
        })
      }

      gsap.to(fill.current, {
        width: styles[formPhase].targetSize,
        height: styles[formPhase].targetSize, // Keep it circular
        duration: styles[formPhase].duration,
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
    { dependencies: [formPhase] }
  )

  return {
    btnRef: btn,
    shineRef: shine,
    fillRef: fill,
    textRef: text,
  }
}
