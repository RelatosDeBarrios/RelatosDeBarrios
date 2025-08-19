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

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

export const FormWithAction = ({ action, data }: FormProps) => {
  // Initialize React Hook Form with Zod resolver
  const methods = useForm<ClientFormValues>({
    mode: 'onChange',
    // @ts-expect-error The zod schema defines nullable but RHF expects non-nullable
    resolver: zodResolver(ClientFormSchema),
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

  // Use the contact submission hook
  const { onSubmit, phase } = useContactSubmit({ action, setError })

  return (
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
  )
}
