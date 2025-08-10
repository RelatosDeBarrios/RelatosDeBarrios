'use client'

import { cn } from '@/utils/css'
import { useRef } from 'react'
import { Check, Loader2, Send, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SubmitButtonType } from '../types/form'
import { ActionState } from '../types/action'

interface FormSubmitButtonProps {
  submitContent: SubmitButtonType
  pending: boolean
  state: ActionState
}

export const FormSubmitButton = ({
  submitContent,
  state,
  pending,
}: FormSubmitButtonProps) => {
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const shineRef = useRef<HTMLSpanElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const isPending = pending
  const idle = state.ok === null && !isPending
  const isSuccess = !idle && state.ok && !isPending
  const isError = !idle && !state.ok && !isPending

  useGSAP(
    () => {
      if (!btnRef.current || !shineRef.current || !fillRef.current) return

      // Always kill previous tweens before starting a new one
      gsap.killTweensOf(fillRef.current)
      gsap.killTweensOf(shineRef.current)

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
        currentX = gsap.getProperty(fillRef.current, 'xPercent') as number
        targetX = 100
        targetColor = 'green'
        // Duration proportional to distance for smoothness
        duration = Math.max(1, (Math.abs(100 - (currentX ?? 0)) / 100) * 1)
      } else if (isError) {
        currentX = gsap.getProperty(fillRef.current, 'xPercent') as number
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
      gsap.to(fillRef.current, {
        xPercent: targetX,
        backgroundColor: targetColor,
        duration,
        ease: 'power2.inOut',
      })

      // Shine animation (only when pending)
      if (isPending) {
        gsap.to(shineRef.current, {
          xPercent: 200,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: -0.1,
        })
      } else {
        // Reset shine position and opacity when not pending
        gsap.set(shineRef.current, {
          xPercent: -100,
          opacity: 0,
        })
      }
    },
    { dependencies: [isPending, isSuccess, isError, idle], scope: btnRef }
  )

  const label = isPending
    ? 'Enviando'
    : isSuccess
      ? 'Enviado'
      : isError
        ? 'Error'
        : 'Enviar Correo'
  const Icon = isPending ? Loader2 : isSuccess ? Check : isError ? X : Send

  return (
    <button
      ref={btnRef}
      type={submitContent.type}
      disabled={isPending || isSuccess || isError}
      className={cn(
        'relative mt-2 overflow-hidden rounded-lg px-6 py-4',
        'bg-hub-accent/60 hover:bg-hub-accent/80 transition-colors duration-300 ease-out',
        isError && 'bg-hub-error/80 hover:bg-hub-error/40',
        isPending && 'bg-hub-accent/40 hover:bg-hub-accent/40',
        'w-full cursor-pointer'
      )}
    >
      {/* Content */}
      <span className='text-hub-background relative z-30 flex w-full items-center justify-center gap-2 font-semibold tracking-wide'>
        <Icon className={cn('size-4', isPending && 'animate-spin')} />
        <span>{label}</span>
      </span>

      {/* Soft mint fill (animated) */}
      <span
        ref={fillRef}
        aria-hidden
        className={cn(
          'absolute inset-0 z-20 w-full -translate-x-full overflow-hidden will-change-transform',
          'bg-green-400',
          'pointer-events-none'
        )}
      >
        {/* Shimmer line */}
        <span
          ref={shineRef}
          aria-hidden
          className={cn(
            'absolute inset-0 z-40 w-full -translate-x-full will-change-transform',
            'bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)]',
            isPending ? 'opacity-50' : 'opacity-0',
            'pointer-events-none'
          )}
        />
      </span>
    </button>
  )
}
