import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText, ScrollTrigger)

interface UseAnimateTextProps {
  text: gsap.DOMTarget
  trigger: gsap.DOMTarget

  preset?: 'fullscreen' | 'viewport' | 'centered'

  scrollTrigger?: {
    start?: string | number | ScrollTrigger.StartEndFunc
    end?: string | number | ScrollTrigger.StartEndFunc
    scrub?: boolean | number
    markers?: boolean
  }

  ranges?: {
    pin?: {
      start: string | number | ScrollTrigger.StartEndFunc
      end: string | number | ScrollTrigger.StartEndFunc
    }
    textAnimation?: {
      start: string | number | ScrollTrigger.StartEndFunc
      end: string | number | ScrollTrigger.StartEndFunc
    }
  }

  // Text animation configuration
  textStyle?: {
    animation?: gsap.TweenVars
    stagger?: number
  }

  timeline?: {
    target: gsap.DOMTarget
    animation: gsap.TweenVars
    timing: 'before' | 'after' | 'with'
    offset?: string
    initialState?: gsap.TweenVars
  }[]
}

const PRESETS = {
  fullscreen: {
    scrollTrigger: { start: 'top center', end: 'bottom center' },
    pin: { start: 'top top', end: 'bottom bottom' },
    textAnimation: { start: 'top 70%', end: 'bottom bottom' },
  },
  viewport: {
    scrollTrigger: { start: 'top bottom', end: 'bottom top' },
    pin: { start: 'center center', end: 'bottom bottom' },
    textAnimation: { start: 'top bottom', end: 'bottom top' },
  },
  centered: {
    scrollTrigger: { start: 'center center', end: 'bottom center' },
    pin: { start: 'center center', end: 'bottom center' },
    textAnimation: { start: 'center center', end: 'bottom center' },
  },
} as const

const resolveConfig = ({
  preset,
  ranges,
  scrollTrigger,
  textStyle,
  timeline,
}: Omit<UseAnimateTextProps, 'text' | 'trigger'>) => {
  const selectedPreset = preset ? PRESETS[preset] : PRESETS.fullscreen

  return {
    ranges: {
      pin: ranges?.pin || selectedPreset.pin,
      textAnimation: ranges?.textAnimation || selectedPreset.textAnimation,
    },

    scrollTrigger: {
      start: scrollTrigger?.start || selectedPreset.scrollTrigger.start,
      end: scrollTrigger?.end || selectedPreset.scrollTrigger.end,
      scrub: scrollTrigger?.scrub ?? 1,
      markers: scrollTrigger?.markers ?? false,
    },

    textStyle: textStyle?.animation || {
      y: '0%',
      opacity: 1,
      stagger: textStyle?.stagger || 0.1,
      ease: 'power4.out',
    },

    timeline: timeline || [],
  }
}

export const useAnimateText = ({ text, trigger, ...props }: UseAnimateTextProps) => {
  const { scrollTrigger, ranges, timeline, textStyle } = resolveConfig(props)

  useGSAP(() => {
    const { lines: splitLines } = SplitText.create(text, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line++',
    })

    const textLines = splitLines as HTMLElement[]

    // const computedStyle = window.getComputedStyle(textRef.current)
    //  const textIndent = computedStyle.textIndent
    //
    //  if (textIndent && textIndent !== '0px') {
    //    if (textLines.length > 0) {
    //      textLines[0].style.paddingLeft = textIndent
    //    }
    //    textRef.current.style.textIndent = '0'
    //  }

    gsap.set(textLines, { y: '40%', opacity: 0 })

    timeline.forEach((element) => {
      if (!element.target) return
      const defaultInitialState = { opacity: 0, y: 20 }
      gsap.set(element.target, {
        ...defaultInitialState,
        ...element.initialState,
      })
    })

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: scrollTrigger.start,
        end: scrollTrigger.end,
        scrub: scrollTrigger.scrub,
        markers: scrollTrigger.markers,
      },
    })

    masterTimeline.to(textLines, textStyle, 0)

    timeline.forEach((element) => {
      if (!element.target) return

      let position: string | number = 0
      switch (element.timing) {
        case 'before':
          position = 0
          break
        case 'with':
          position = 0
          break
        case 'after':
          position = '>'
          break
      }
      if (element.offset) {
        if (typeof position === 'string') position = position + element.offset
        else position = element.offset
      }
      masterTimeline.to(element.target, element.animation, position)
    })

    ScrollTrigger.create({
      trigger: trigger,
      start: ranges.pin.start,
      end: ranges.pin.end,
      pin: text,
      pinSpacing: false,
      anticipatePin: 1,
      refreshPriority: -1,
      scrub: 1,
      markers: scrollTrigger.markers,
    })
  })
}
