'use client'
import { formatBytes } from '@/utils/format'
import { FileDropzone } from './FileDropzone'
import { FilePreviewGrid } from './FilePreviewGrid'
import { cn } from '@/utils/css'
import { AttachmentsType } from '../types/attachments'
import { FieldError } from './FieldError'
import { useFileAttachments } from '../hooks/useFileAttachments'

interface FormAttachmentsProps {
  attachments: AttachmentsType
}

export const FormAttachments = ({ attachments }: FormAttachmentsProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    previewFiles: { total_qty, total_size, files: previewFiles },
    removeFile,
    clearFiles,
    errorMessage,
  } = useFileAttachments(attachments)

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
        <p className='text-hub-text mb-2'>
          {isDragActive
            ? 'Suelta los archivos aquí...'
            : attachments.placeholder}
        </p>
        {total_qty === 0 && (
          <p className='text-sm text-gray-500'>
            Tamaño máximo: {attachments.maxSize}mb
          </p>
        )}
        {total_qty > 0 && (
          <FilePreviewGrid removeFile={removeFile} files={previewFiles} />
        )}
      </FileDropzone>

      <FieldError message={errorMessage} />

      {total_qty > 0 && (
        <div className='mt-2 flex w-full items-center justify-between gap-4'>
          <p className='text-sm text-gray-500'>
            {total_qty > 0
              ? `${total_qty} archivos y ${formatBytes(total_size)} de ${attachments.maxSize}mb cargados `
              : `Tamaño máximo: ${attachments.maxSize}mb`}
          </p>

          <button
            type='button'
            onClick={clearFiles}
            className='text-hub-error/80 hover:text-hub-error cursor-pointer text-sm'
          >
            Borrar todos
          </button>
        </div>
      )}
    </div>
  )
}
