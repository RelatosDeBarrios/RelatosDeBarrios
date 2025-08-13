'use client'

import { useContactSubmit } from '../hooks/useContactSubmit'
import { SendEmailAction } from '../types/action'
import { ContactForm } from '../types/form'
import { useFormStore } from '../store/formStore'
import { FormContribution } from './FormContribution'
import { FormInput } from './FormInput'
import { FormSubmitButton } from './FormSubmitButton'

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

export const FormWithAction = ({ action, data }: FormProps) => {
  const { handleSubmit } = useContactSubmit({ action })
  const fieldErrors = useFormStore((s) => s.fieldErrors)
  const pending = useFormStore((s) => s.pending)
  const phase = useFormStore((s) => s.phase)

  return (
    <>
      <form
        action={handleSubmit}
        className='bg-hub-background/20 ring-hub-border mx-auto w-full max-w-2xl space-y-4 rounded-2xl p-4 ring backdrop-blur-2xl md:p-8'
      >
        {/* Name field */}
        <FormInput inputContent={data.name} fieldErrors={fieldErrors?.[data.name.id]} />

        {/* Email field */}
        <FormInput inputContent={data.email} fieldErrors={fieldErrors?.[data.email.id]} />

        {/* Message/Commentary field */}
        <FormInput inputContent={data.commentary} fieldErrors={fieldErrors?.[data.commentary.id]} />

        {/* Material contribution */}
        <FormContribution
          contribution={data.contribution}
          attachments={data.attachments}
        />

        {/* Submit button */}
        <FormSubmitButton
          submitContent={data.submit}
          state={{ success: phase === 'success', error: phase === 'error' }}
          pending={pending}
        />
      </form>
    </>
  )
}
