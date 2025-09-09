import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { useRef } from 'react'

gsap.registerPlugin(SplitText, ScrollTrigger)

export const useAnimateText = <
  T extends HTMLElement = HTMLParagraphElement,
  P extends HTMLElement = HTMLElement,
>() => {
  const textRef = useRef<T>(null)
  const parentRef = useRef<P>(null)

  useGSAP(
    () => {
      if (!textRef.current || !parentRef) return

      console.log('parentRef: ', parentRef, parentRef.current)

      const split = SplitText.create(textRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line++',
      })

      const computedStyle = window.getComputedStyle(textRef.current)
      const textIndent = computedStyle.textIndent

      if (textIndent && textIndent !== '0px') {
        if (split.lines.length > 0) {
          ;(split.lines[0] as HTMLElement).style.paddingLeft = textIndent
        }
        textRef.current.style.textIndent = '0'
      }

      gsap.set(split.lines, { y: '40%', opacity: 0 })

      // ScrollTrigger.create({
      //   trigger: parentRef.current,
      //   start: 'top center',
      //   end: 'bottom bottom',
      //   pin: textRef.current,
      //   pinSpacing: false,
      //   markers: true,
      // })

      gsap.to(split.lines, {
        y: '0%',
        opacity: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          // markers: true,
        },
      })
    },
    { scope: textRef, dependencies: [parentRef] }
  )

  return { textRef, parentRef }
}
