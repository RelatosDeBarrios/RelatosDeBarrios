'use client'

import { LogoSVG } from '@/app/villacovico/components/LogoSVG'
import { cn } from '@/utils/css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/all'

interface VisualArchiveSelectorCheckboxProps {
  id: string
  selected: boolean
}

gsap.registerPlugin(useGSAP, MorphSVGPlugin)

// Configs
const STROKE_WIDTH = 2
const SQUARE_PATH = 'M 2 2 H 36 V 36 H 2 Z'

export const VisualArchiveSelectorCheckbox = ({
  id,
  selected = false,
}: VisualArchiveSelectorCheckboxProps) => {
  useGSAP(() => {
    if (selected) {
      gsap.to(`#${id}-checkbox-square`, {
        duration: 0.4,
        morphSVG: `#${id}-checkbox-logo`,
        fill: '#fffcf8',
        ease: 'power2.out',
      })
    } else {
      gsap.to(`#${id}-checkbox-square`, {
        duration: 0.4,
        morphSVG: SQUARE_PATH,
        fill: 'transparent',
        ease: 'power2.out',
      })
    }
  }, [selected, id])

  return (
    <LogoSVG
      id={`${id}-checkbox-logo`}
      className={cn('stroke-covico-background fill-covico-background hidden')}
      strokeWidth={STROKE_WIDTH}
    >
      <path
        id={`${id}-checkbox-square`}
        d={SQUARE_PATH}
        strokeWidth={STROKE_WIDTH}
        className={cn(
          'stroke-covico-background fill-transparent',
          selected && 'fill-covico-background',
          !selected &&
            'group-hover:fill-covico-background/60 group-hover:stroke-covico-yellow transition-colors duration-300'
        )}
      />
    </LogoSVG>
  )
}
