import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText, ScrollTrigger)

type DOMElement<TText extends HTMLParagraphElement = HTMLParagraphElement> =
  | string
  | React.RefObject<TText | null>

interface UseScrollTextRevealProps {
  trigger: string | React.RefObject<HTMLElement | null>

  preset?: 'fullscreen' | 'viewport' | 'centered'

  animation?: {
    y?: string | number
    opacity?: number
    stagger?: number
    ease?: gsap.EaseFunction
    scrollTrigger?: {
      start: string | number | ScrollTrigger.StartEndFunc
      end: string | number | ScrollTrigger.StartEndFunc
      scrub?: boolean | number
      markers?: boolean
    }
  }

  pin?: {
    start?: string | number | ScrollTrigger.StartEndFunc
    end?: string | number | ScrollTrigger.StartEndFunc
    markers?: boolean
    disabled?: boolean
  }

  timeline?: {
    target: string | React.RefObject<HTMLElement | null>
    animation: {
      from?: gsap.TweenVars
      to: gsap.TweenVars
    }
    position?: gsap.Position
  }[]
}

const PRESETS = {
  fullscreen: {
    scrollTrigger: { start: 'top center', end: 'bottom center' },
    pin: { start: 'top top', end: 'bottom bottom' },
  },
  viewport: {
    scrollTrigger: { start: 'top bottom', end: 'bottom top' },
    pin: { start: 'center center', end: 'bottom bottom' },
  },
  centered: {
    scrollTrigger: { start: 'center center', end: 'bottom center' },
    pin: { start: 'center center', end: 'bottom center' },
  },
} as const

const resolveConfig = ({
  preset,
  pin,
  animation,
  timeline,
}: Omit<UseScrollTextRevealProps, 'text' | 'trigger'>) => {
  const selectedPreset = preset ? PRESETS[preset] : PRESETS.fullscreen

  return {
    pin: {
      start: pin?.start || selectedPreset.pin.start,
      end: pin?.end || selectedPreset.pin.end,
      markers: pin?.markers ?? false,
      disabled: pin?.disabled || false,
    },

    animation: {
      y: '0%',
      opacity: 1,
      stagger: animation?.stagger || 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        start: animation?.scrollTrigger?.start || selectedPreset.scrollTrigger.start,
        end: animation?.scrollTrigger?.end || selectedPreset.scrollTrigger.end,
        scrub: animation?.scrollTrigger?.scrub ?? 1,
        markers: animation?.scrollTrigger?.markers ?? false,
      },
    },

    timeline: timeline || [],
  }
}

export const useScrollTextReveal = <TText extends HTMLParagraphElement = HTMLParagraphElement>(
  text: DOMElement<TText>,
  { trigger, ...props }: UseScrollTextRevealProps,
  { scope }: { scope?: React.RefObject<HTMLElement | null> } = {}
) => {
  const { animation, pin, timeline } = resolveConfig(props)

  useGSAP(
    () => {
      const textEl = typeof text === 'string' ? text : text?.current
      const triggerEl = typeof trigger === 'string' ? trigger : trigger?.current

      if (!textEl || !triggerEl) return

      const { lines: splitLines } = SplitText.create(textEl, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line++',
      })

      const textLines = splitLines as HTMLElement[]

      gsap.set(textLines, { y: '40%', opacity: 0 })

      if (!pin.disabled) {
        ScrollTrigger.create({
          trigger: triggerEl,
          start: pin.start,
          end: pin.end,
          pin: textEl,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: -1,
          scrub: 1,
          markers: pin.markers,
        })
      }

      const { scrollTrigger, ...textStyle } = animation

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          ...scrollTrigger,
        },
      })

      tl.to(textLines, textStyle, 0)

      timeline.forEach(({ target, animation, position = '>' }) => {
        const targetEl = typeof target === 'string' ? target : target?.current
        if (!targetEl) return

        if (animation.from) {
          gsap.set(targetEl, animation.from)
        }

        tl.to(targetEl, animation.to, position)
      })
    },
    { scope, dependencies: [[text, trigger]] }
  )
}
