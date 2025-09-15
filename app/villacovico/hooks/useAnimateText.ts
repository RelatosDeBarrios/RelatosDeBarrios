import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { useRef } from 'react'

gsap.registerPlugin(SplitText, ScrollTrigger)

interface UseAnimateTextReturn<T, P> {
  textRef: React.RefObject<T | null>
  parentRef: React.RefObject<P | null>
}

interface UseAnimateTextProps {
  parent: {
    start: string | number | ScrollTrigger.StartEndFunc
    end: string | number | ScrollTrigger.StartEndFunc
  }
  lines: {
    start: string | number | ScrollTrigger.StartEndFunc
    end: string | number | ScrollTrigger.StartEndFunc
  }
}

export const useAnimateText = <T extends HTMLElement, P extends HTMLElement>({
  parent = { start: 'center center', end: 'bottom bottom' },
  lines = { start: 'top top', end: 'bottom bottom' },
}: UseAnimateTextProps): UseAnimateTextReturn<T, P> => {
  const textRef = useRef<T>(null)
  const parentRef = useRef<P>(null)

  useGSAP(
    () => {
      if (!textRef.current || !parentRef) return

      const { lines: splitLines } = SplitText.create(textRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line++',
      })

      const textLines = splitLines as HTMLElement[]

      // const computedStyle = window.getComputedStyle(textRef.current)
      // const textIndent = computedStyle.textIndent

      // if (textIndent && textIndent !== '0px') {
      //   if (textLines.length > 0) {
      //     textLines[0].style.paddingLeft = textIndent
      //   }
      //   textRef.current.style.textIndent = '0'
      // }

      gsap.set(textLines, { y: '40%', opacity: 0 })

      ScrollTrigger.create({
        trigger: parentRef.current,
        start: parent.start,
        end: parent.end,
        pin: textRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        refreshPriority: -1,
        scrub: 1,
        markers: true,
      })

      gsap.to(textLines, {
        y: '0%',
        opacity: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: parentRef.current,
          start: lines.start,
          end: lines.end,
          scrub: 1,
          markers: true,
        },
      })
    },
    { scope: textRef, dependencies: [parentRef] }
  )

  return { textRef, parentRef }
}
