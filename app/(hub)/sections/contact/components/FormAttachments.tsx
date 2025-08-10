'use client'
import { formatBytes } from '@/utils/format'
import { FileDropzone } from './FileDropzone'
import { FilePreviewGrid } from './FilePreviewGrid'
import { cn } from '@/utils/css'
import { AttachmentsType } from '../types/attachments'
import { useFileAttachments } from '../hooks/useFileAttachments'

interface FormAttachmentsProps {
  attachments: AttachmentsType
}

export const FormAttachments = ({ attachments }: FormAttachmentsProps) => {
  const {
    previewFiles,
    hiddenInputRef,
    getRootProps,
    getInputProps,
    isDragActive,
    clearFiles,
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
        {previewFiles.total_qty === 0 && (
          <p className='text-hub-text mb-2'>
            {isDragActive
              ? 'Suelta los archivos aquí...'
              : attachments.placeholder}
          </p>
        )}
        <p className='text-sm text-gray-500'>
          {previewFiles.total_qty > 0
            ? `${previewFiles.total_qty} archivos y ${formatBytes(previewFiles.total_size)} cargados`
            : `Tamaño máximo: ${attachments.maxSize}MB`}
        </p>
        {previewFiles.total_qty > 0 && (
          <FilePreviewGrid files={previewFiles.files} />
        )}
      </FileDropzone>

      <input
        type={attachments.type}
        name={attachments.id}
        id={attachments.id}
        required={attachments.required}
        ref={hiddenInputRef}
        className='opacity-0'
      />

      {previewFiles.total_qty > 0 && (
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
