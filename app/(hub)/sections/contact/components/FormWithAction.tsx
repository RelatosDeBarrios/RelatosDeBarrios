'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendEmailAction } from '../types/action'
import { ContactForm } from '../types/form'
import {
  ClientFormSchema,
  ClientFormValues,
  FIELD_IDS,
} from '../schemas/formSchema'
import { FormContribution } from './FormContribution'
import { FormInput } from './FormInput'
import { FormSubmitButton } from './FormSubmitButton'
import { useContactSubmit } from '../hooks/useContactSubmit'
import { cn } from '@/utils/css'
import { useEffect, useRef } from 'react'
import { isEnv } from '@/utils/env'

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

const defaultValues = {
  [FIELD_IDS.name]: isEnv('dev') ? 'Randy Orton' : '',
  [FIELD_IDS.email]: isEnv('dev') ? 'rko@email.com' : '',
  [FIELD_IDS.commentary]: isEnv('dev') ? 'Test message' : '',
  [FIELD_IDS.contribution]: isEnv('dev') ? 'rengifo' : '',
  [FIELD_IDS.attachments]: [],
}

export const FormWithAction = ({ action, data }: FormProps) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  // Initialize React Hook Form with Zod resolver
  const methods = useForm<ClientFormValues>({
    mode: 'onChange',
    // @ts-expect-error The zod schema defines nullable but RHF expects non-nullable
    resolver: zodResolver(ClientFormSchema),
    defaultValues,
  })

  // Use the contact submission hook
  const { onSubmit, phase } = useContactSubmit({
    action,
    setError: methods.setError,
  })

  useEffect(() => {
    if (!formRef.current) return
    if (phase === 'submitting') {
      const currentFormHeight = formRef.current.getBoundingClientRect().height
      formRef.current.style.height = `${currentFormHeight}px`
    }
  }, [phase])

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn(
          'bg-hub-background/20 ring-hub-border relative mx-auto w-full max-w-2xl space-y-4 overflow-hidden rounded-2xl p-4 ring backdrop-blur-2xl md:p-8'
        )}
      >
        {phase !== 'success' && (
          <>
            {/* Name field */}
            <FormInput inputContent={data.name} />

            {/* Email field */}
            <FormInput inputContent={data.email} />

            {/* Message/Commentary field */}
            <FormInput inputContent={data.commentary} />

            {/* Material contribution */}
            <FormContribution
              contribution={data.contribution}
              attachments={data.attachments}
            />
          </>
        )}

        {/* Submit button */}
        <FormSubmitButton submitContent={data.submit} formPhase={phase} />
      </form>
    </FormProvider>
  )
}
