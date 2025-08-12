'use client'
import { useState } from 'react'
import { FormAttachments } from './FormAttachments'
import { ContributionType } from '../types/form'
import { AttachmentsType } from '../types/attachments'
import { ProjectsId } from '@/types/core'
import { FieldError } from './FieldError'

interface FormAttachmentsProps {
  contribution: ContributionType
  attachments: AttachmentsType
  fieldErrors?: string[]
}

export const FormContribution = ({
  contribution,
  attachments,
  fieldErrors,
}: FormAttachmentsProps) => {
  const [selectedProject, setSelectedProject] = useState<ProjectsId | ''>('')

  return (
    <>
      {/* Contribution question and project selection */}
      <div>
        <p className='text-hub-text block font-medium'>{contribution.label}</p>
        <select
          id={contribution.id}
          name={contribution.id}
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value as ProjectsId)}
          className='border-hub-border focus:ring-hub-accent bg-hub-background/60 w-full rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none'
        >
          {Object.values(contribution.options).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldErrors && <FieldError errors={fieldErrors} />}
      </div>

      {/* File attachments - conditionally rendered */}
      {selectedProject && (
        <>
          <FormAttachments attachments={attachments} />
          {fieldErrors && fieldErrors.length > 0 && (
            <div className='text-hub-error mt-1 text-sm'>
              {fieldErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
