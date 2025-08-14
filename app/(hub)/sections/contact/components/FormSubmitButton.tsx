'use client'

import { cn } from '@/utils/css'
import { Check, Loader2, Send, X } from 'lucide-react'
import { SubmitButtonType } from '../types/form'
import { ActionState } from '../types/action'
import { useSubmitButtonAnimation } from '../hooks/useSubmitButtonAnimation'
import { useFormStore } from '../store/formStore'

interface FormSubmitButtonProps {
  submitContent: SubmitButtonType
  pending: boolean
  state: ActionState
}

export const FormSubmitButton = ({ submitContent }: FormSubmitButtonProps) => {
  const phase = useFormStore((s) => s.phase)
  const pending = useFormStore((s) => s.pending)
  console.log(phase)

  const isPending = pending
  const idle = phase === 'idle'
  const isSuccess = phase === 'success'
  const isError = phase === 'error'

  const { btnRef, shineRef, fillRef } = useSubmitButtonAnimation({
    states: {
      idle,
      isPending,
      isSuccess,
      isError,
    },
  })

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
