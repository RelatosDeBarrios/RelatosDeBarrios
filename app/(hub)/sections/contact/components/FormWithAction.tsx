'use client'

import { useRef } from 'react'
import { SendEmailAction } from '../types/action'
import { ContactForm } from '../types/form'
import { FormContribution } from './FormContribution'
import { FormInput } from './FormInput'
import { useActionState } from 'react'
import { FormSubmitButton } from './FormSubmitButton'
import { useSubmit } from '../hooks/useSubmit'

interface FormProps {
  action: SendEmailAction
  data: ContactForm
}

export const FormWithAction = ({ action, data }: FormProps) => {
  // Server action state
  const [state, formAction, pending] = useActionState(action, {
    ok: null,
    error: null,
  })

  // Form reference for manual submission
  const formRef = useRef<HTMLFormElement>(null)

  // NOTE: states through form should be managed by a global state management solution

  // TODO: refactor this:

  // Submit hook for IP validation and file uploads
  const {
    prepareSubmission,
    loading,
    error,
    uploadProgress,
    resetState,
    validationErrors,
  } = useSubmit()

  // Combining loading states
  const isPending = pending || loading

  // Handle form submission with validation, IP check, and file uploads
  const handleSubmit = async (formData: FormData) => {
    try {
      // Get files from global state maybe?
      const files = ['']

      // Prepare submission with validation, IP check, and file uploads
      const { formData: preparedData, canProceed } = await prepareSubmission(
        formData,
        files
      )

      if (!canProceed) {
        return // Don't proceed if validation/IP check/upload failed
      }

      // Submit the form with the server action using the prepared form data
      // that includes blob URLs and excludes large file objects
      formAction(preparedData)

      if (state.ok === true) {
        // Reset state if the form is successfully submitted
        resetState()
      }
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }

  return (
    <>
      <form
        ref={formRef}
        action={handleSubmit}
        className='bg-hub-background/20 ring-hub-border mx-auto w-full max-w-2xl space-y-4 rounded-2xl p-4 ring backdrop-blur-2xl md:p-8'
      >
        {/* Name field */}
        <FormInput
          inputContent={data.name}
          fieldErrors={validationErrors.errors.name}
        />

        {/* Email field */}
        <FormInput
          inputContent={data.email}
          fieldErrors={validationErrors.errors.email}
        />

        {/* Message/Commentary field */}
        <FormInput
          inputContent={data.commentary}
          fieldErrors={validationErrors.errors.commentary}
        />

        {/* Material contribution */}
        <FormContribution
          contribution={data.contribution}
          attachments={data.attachments}
          fieldErrors={validationErrors?.errors?.attachments}
        />

        {/* Error message from submission process */}
        {error && (
          <div className='text-hub-error bg-hub-error/10 rounded p-2 text-sm'>
            {error}
          </div>
        )}

        {/* Upload progress indicator */}
        {loading && uploadProgress > 0 && (
          <div className='w-full'>
            <div className='bg-hub-background h-1 overflow-hidden rounded-full'>
              <div
                className='bg-hub-accent h-full transition-all duration-300 ease-out'
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className='text-hub-text/70 mt-1 text-right text-xs'>
              {uploadProgress < 100
                ? `Subiendo archivos: ${uploadProgress}%`
                : 'Procesando...'}
            </p>
          </div>
        )}

        {/* Submit button */}
        <FormSubmitButton
          submitContent={data.submit}
          state={state}
          pending={isPending}
        />
      </form>
    </>
  )
}
