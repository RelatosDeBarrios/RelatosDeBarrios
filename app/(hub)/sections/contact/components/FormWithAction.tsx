'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendEmailAction } from '../types/action'
import { ContactForm } from '../types/form'
import { FormSchema, FormValues, FIELD_IDS } from '../schemas/formSchema'
import { FormContribution } from './FormContribution'
import { FormInput } from './FormInput'
import { FormSubmitButton } from './FormSubmitButton'
import { validateIp } from '../utils/validateIp'

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

type Phase =
  | 'idle'
  | 'validating'
  | 'uploading'
  | 'submitting'
  | 'success'
  | 'error'

// Type for server errors
interface ServerError {
  fieldErrors?: Record<string, string | string[]>
  formError?: string
}

export const FormWithAction = ({ action, data }: FormProps) => {
  // Local state for multi-phase submission
  const [phase, setPhase] = useState<Phase>('idle')

  // Initialize React Hook Form with Zod resolver
  const methods = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [FIELD_IDS.name]: '',
      [FIELD_IDS.email]: '',
      [FIELD_IDS.commentary]: '',
      [FIELD_IDS.contribution]: '',
      [FIELD_IDS.attachments]: [],
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      // Validate client-side (handled by RHF with Zod resolver)
      setPhase('validating')

      // validate ip
      const { allowed, error, message } = await validateIp('/api/validate-ip')
      console.log('IP validation result:', { allowed, error, message })

      if (!allowed) {
        setPhase('error')
        setError('form_submit', {
          message: error || message || 'Error validating IP address.',
        })
        return
      }

      // Handle file uploads if present
      if (values[FIELD_IDS.attachments]?.length) {
        setPhase('uploading')
        // Here you'd upload files and get reference URLs
        // const uploadRefs = await uploadFiles(values[FIELD_IDS.attachments])

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Submit to server
      setPhase('submitting')

      // Simulate server submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here you'd call the actual server action
      // const formData = new FormData()
      // Object.entries(values).forEach(([key, value]) => {
      //   if (Array.isArray(value)) {
      //     value.forEach(item => formData.append(key, item))
      //   } else if (value !== undefined && value !== null) {
      //     formData.append(key, value)
      //   }
      // })
      // const result = await action({}, formData)

      // On success
      setPhase('success')

      // We're NOT resetting the form on success per your requirements
      // User must manually reload the page to submit another form
    } catch (error: unknown) {
      setPhase('error')

      // Type guard for server error
      const serverError = error as ServerError

      // Map server validation errors back to fields
      if (serverError.fieldErrors) {
        Object.entries(serverError.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof FormValues, {
            message: Array.isArray(messages)
              ? messages.join('. ')
              : String(messages),
          })
        })
      }

      // Global form error
      if (serverError.formError) {
        setError('root.serverError', { message: serverError.formError })
      }
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-hub-background/20 ring-hub-border mx-auto w-full max-w-2xl space-y-4 rounded-2xl p-4 ring backdrop-blur-2xl md:p-8'
        >
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

          {/* Submit button */}
          <FormSubmitButton
            submitContent={data.submit}
            state={{ success: phase === 'success', error: phase === 'error' }}
            pending={
              isSubmitting ||
              ['validating', 'uploading', 'submitting'].includes(phase)
            }
          />
        </form>
      </FormProvider>
    </>
  )
}
