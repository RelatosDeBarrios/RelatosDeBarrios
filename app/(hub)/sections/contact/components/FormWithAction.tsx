'use client'

import { SendEmailAction } from '../types/action'
import { ContactForm } from '../types/form'
import { FormContribution } from './FormContribution'
import { FormInput } from './FormInput'
import { useActionState } from 'react'
import { FormSubmitButton } from './FormSubmitButton'

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

export const FormWithAction = ({ action, data }: FormProps) => {
  const [state, formAction, pending] = useActionState(action, {
    ok: null,
  })

  return (
    <form
      action={formAction}
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
        state={state}
        pending={pending}
      />
    </form>
  )
}
