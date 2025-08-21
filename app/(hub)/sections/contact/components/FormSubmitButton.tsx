'use client'

import { cn } from '@/utils/css'
import { Check, Loader2, Send, X } from 'lucide-react'
import { SubmitButtonType } from '../types/form'
import { useSubmitButtonAnimation } from '../hooks/useSubmitButtonAnimation'
import { useFormContext } from 'react-hook-form'
import { Phase } from '../hooks/useContactSubmit'

interface FormSubmitButtonProps {
  submitContent: SubmitButtonType
  formPhase: Phase
}

export const FormSubmitButton = ({
  submitContent,
  formPhase,
}: FormSubmitButtonProps) => {
  const { formState } = useFormContext()
  const states = {
    idle: formPhase === 'idle',
    isPending:
      formPhase === 'validating' ||
      formPhase === 'uploading' ||
      formPhase === 'submitting',
    isSuccess: formPhase === 'success',
    isError: formPhase === 'error',
  }

  const { btnRef, shineRef, fillRef, textRef } = useSubmitButtonAnimation({
    formPhase,
    isPending: states.isPending,
  })

  const label: Record<Phase, string> = {
    validating: 'Estamos validando tu información...',
    idle: 'Enviar correo',
    uploading: 'Subiendo archivos...',
    submitting: 'Enviando correo..',
    error: (formState.errors['form_submit']?.message as string) || 'Error',
    success:
      'Correo enviado exitosamente! Nos pondremos en contacto contigo pronto.',
  }

  const Icon = states.isPending
    ? Loader2
    : states.isSuccess
      ? Check
      : states.isError
        ? X
        : Send

  return (
    <button
      ref={btnRef}
      type={submitContent.type}
      disabled={!states.idle}
      className={cn(
        'relative overflow-hidden rounded-lg px-6 py-4',
        'bg-hub-accent/60 hover:bg-hub-accent/80 transition-all duration-600 ease-out',
        'w-full cursor-pointer',
        states.isError && 'bg-hub-error/80 hover:bg-hub-error/40',
        states.isPending && 'bg-hub-accent/5 hover:bg-hub-accent/0',
        states.isSuccess &&
          'absolute inset-0 h-full cursor-auto bg-transparent hover:bg-transparent'
      )}
    >
      {/* Content */}
      <span
        ref={textRef}
        className={cn(
          'text-hub-background relative z-30 flex w-full items-center justify-center gap-2 font-semibold tracking-wide',
          states.isSuccess && 'text-4xl opacity-0'
        )}
      >
        {!states.isSuccess && (
          <Icon className={cn('size-4', states.isPending && 'animate-spin')} />
        )}

        <span>{label[formPhase]}</span>
      </span>

      {/* Soft mint fill (animated) */}
      <span
        ref={fillRef}
        aria-hidden
        className={cn(
          'absolute top-1/2 left-1/2 z-20 size-0 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-green-400/90 to-transparent blur-2xl will-change-transform',
          states.isError && 'from-hub-error/90',
          states.isSuccess && 'from-green-400/40 to-green-500/50',
          'pointer-events-none'
        )}
      >
        <svg
          className='min-h-screen min-w-screen opacity-25 mix-blend-difference'
          viewBox='0 0 1600 1600'
        >
          <filter id='noise-filter'>
            <feTurbulence baseFrequency='2'></feTurbulence>
          </filter>
          <rect width='100%' height='100%' filter='url(#noise-filter)'></rect>
        </svg>
        {/* Inner pulse (shine) */}
        <span
          ref={shineRef}
          aria-hidden
          className={cn(
            'absolute top-1/2 left-1/2 z-40 size-0 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform',
            'bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.2)_60%,rgba(255,255,255,0)_100%)]',
            states.isPending ? 'opacity-50' : 'opacity-0',
            'pointer-events-none mix-blend-screen'
          )}
        />
      </span>
    </button>
  )
}
