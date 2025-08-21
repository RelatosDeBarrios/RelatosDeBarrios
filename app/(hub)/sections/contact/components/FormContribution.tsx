'use client'
import { useFormContext } from 'react-hook-form'
import { FormAttachments } from './FormAttachments'
import { ContributionType } from '../types/form'
import { AttachmentsType } from '../types/attachments'
import { FieldError } from './FieldError'

interface FormAttachmentsProps {
  contribution: ContributionType
  attachments: AttachmentsType
}

export const FormContribution = ({
  contribution,
  attachments,
}: FormAttachmentsProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  // Watch for project selection to conditionally render attachments
  const selectedProject = watch(contribution.id)
  const errorMessage = errors[contribution.id]?.message as string | undefined

  return (
    <>
      {/* Contribution question and project selection */}
      <div>
        <p className='text-hub-text block font-medium'>{contribution.label}</p>
        <select
          id={contribution.id}
          defaultValue=''
          className='border-hub-border focus:ring-hub-accent bg-hub-background/60 w-full rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none'
          {...register(contribution.id)}
        >
          {Object.values(contribution.options).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError message={errorMessage} />
      </div>

      {/* File attachments - conditionally rendered */}
      {selectedProject && <FormAttachments attachments={attachments} />}
    </>
  )
}
