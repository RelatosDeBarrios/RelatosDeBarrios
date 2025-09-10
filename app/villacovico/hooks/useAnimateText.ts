import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { useRef } from 'react'

gsap.registerPlugin(SplitText, ScrollTrigger)

export const useAnimateText = <T extends HTMLElement = HTMLParagraphElement, P extends HTMLElement = HTMLElement>() => {
  const textRef = useRef<T>(null)
  const parentRef = useRef<P>(null)

  useGSAP(
    () => {
      if (!textRef.current || !parentRef) return

      console.log('parentRef: ', parentRef, parentRef.current)

      const { lines } = SplitText.create(textRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line++',
      })

      const textLines = lines as HTMLElement[]

      const computedStyle = window.getComputedStyle(textRef.current)
      const textIndent = computedStyle.textIndent

      if (textIndent && textIndent !== '0px') {
        if (textLines.length > 0) {
          textLines[0].style.paddingLeft = textIndent
        }
        textRef.current.style.textIndent = '0'
      }

      gsap.set(textLines, { y: '40%', opacity: 0 })

      ScrollTrigger.create({
        trigger: parentRef.current,
        start: 'center center',
        end: 'bottom bottom',
        pin: textRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        refreshPriority: -1,
        scrub: 1,
      })

      gsap.to(textLines, {
        y: '0%',
        opacity: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    },
    { scope: textRef, dependencies: [parentRef] }
  )

  return { textRef, parentRef }
}
