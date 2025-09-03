import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import React, { useRef } from 'react'

gsap.registerPlugin(SplitText, ScrollTrigger)

interface TextAnimatedProps {
  parentRef: React.RefObject<HTMLElement | null> | null
  children: React.ReactElement<{ ref?: React.Ref<HTMLElement> }>
  delay?: number
}

export const TextAnimated = ({
  parentRef = null,
  children,
  delay = 0,
}: TextAnimatedProps) => {
  const textRef = useRef<HTMLElement | null>(null)

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

      gsap.set(split.lines, { y: '100%' })

      gsap.to(split.lines, {
        y: '0%',
        stagger: 0.1,
        ease: 'power4.out',
        delay,
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    },
    { scope: textRef, dependencies: [delay, parentRef] }
  )

  return React.cloneElement(children, {
    ref: textRef,
  })
}
