'use client'
import { useState, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { formatBytes } from '@/utils/format'
import { FileDropzone } from './FileDropzone'
import { FilePreviewGrid } from './FilePreviewGrid'
import { cn } from '@/utils/css'
import { AttachmentsType, DropzoneFile } from '../types/attachments'
import { processImageFile, processNonImageFile } from '../utils/fileUtils'
import { FieldError } from './FieldError'

interface FormAttachmentsProps {
  attachments: AttachmentsType
}

export const FormAttachments = ({ attachments }: FormAttachmentsProps) => {
  // Track preview files locally for UI
  const [previewFiles, setPreviewFiles] = useState<DropzoneFile[]>([])

  // Access React Hook Form methods
  const {
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  // Derive stats for UI
  const total_qty = previewFiles.length
  const total_size = previewFiles.reduce((acc, f) => acc + f.file.size, 0)
  const errorMessage = errors[attachments.id]?.message as string | undefined

  // Handle file drops
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        // Process files for preview
        const processedFiles = await Promise.all(
          acceptedFiles.map((file) =>
            file.type.startsWith('image/')
              ? processImageFile(file)
              : Promise.resolve(processNonImageFile(file))
          )
        )

        // Update preview state
        setPreviewFiles((prev) => [...prev, ...processedFiles])

        // Extract actual files for RHF
        const allFiles = [...previewFiles, ...processedFiles].map((f) => f.file)

        // Update RHF value
        setValue(attachments.id, allFiles, {
          shouldDirty: true,
          shouldValidate: true,
        })

        // Clear any previous errors
        clearErrors(attachments.id)
      } catch (error) {
        console.error('Error processing files:', error)
      }
    },
    [previewFiles, setValue, clearErrors, attachments.id]
  )

  // Initialize dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: attachments.accept,
  })

  // Handle removing a file
  const removeFile = (index: number) => {
    setPreviewFiles((prev) => {
      // Clean up object URL if needed
      if (prev[index]?.src) {
        URL.revokeObjectURL(prev[index].src)
      }

      // Create new array without the removed file
      const newFiles = prev.filter((_, i) => i !== index)

      // Update RHF value
      setValue(
        attachments.id,
        newFiles.map((f) => f.file),
        { shouldDirty: true, shouldValidate: true }
      )

      return newFiles
    })
  }

  // Handle clearing all files
  const clearFiles = () => {
    // Clean up object URLs
    previewFiles.forEach(({ src }) => src && URL.revokeObjectURL(src))

    // Clear preview state
    setPreviewFiles([])

    // Clear RHF value
    setValue(attachments.id, [], { shouldDirty: true })
  }

  return (
    <div>
      <label
        htmlFor={attachments.id}
        className='text-hub-text mb-2 block font-medium'
      >
        {attachments.label}
      </label>

      <FileDropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        className={cn(
          'border-hub-border hover:bg-hub-secondary/10 cursor-pointer rounded-lg border-2 border-dashed px-6 py-8 text-center transition hover:border-solid',
          isDragActive && 'bg-hub-secondary/10'
        )}
      >
        {total_qty === 0 && (
          <p className='text-hub-text mb-2'>
            {isDragActive
              ? 'Suelta los archivos aquí...'
              : attachments.placeholder}
          </p>
        )}
        <p className='text-sm text-gray-500'>
          {total_qty > 0
            ? `${total_qty} archivos y ${formatBytes(total_size)} cargados`
            : `Tamaño máximo: ${attachments.maxSize}MB`}
        </p>
        {total_qty > 0 && (
          <FilePreviewGrid removeFile={removeFile} files={previewFiles} />
        )}
      </FileDropzone>

      <FieldError message={errorMessage} />

      {total_qty > 0 && (
        <button
          type='button'
          onClick={clearFiles}
          className='text-hub-text/80 hover:text-hub-text mt-2 text-sm'
        >
          Borrar todos
        </button>
      )}
    </div>
  )
}
