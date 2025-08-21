'use client'

import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { AttachmentsType, DropzoneFile } from '../types/attachments'
import { processImageFile, processNonImageFile } from '../utils/fileUtils'
import { useFormContext } from 'react-hook-form'

export function useFileAttachments(attachments: AttachmentsType) {
  const [files, setFiles] = useState<DropzoneFile[]>([])

  // Access React Hook Form methods
  const {
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext()

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
        setFiles((prev) => [...prev, ...processedFiles])

        // Extract actual files for RHF
        const allFiles = [...files, ...processedFiles].map((f) => f.file)

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
    [files, setValue, clearErrors, attachments.id]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: attachments.accept,
  })

  const clearFiles = () => {
    // Clean up object URLs
    files.forEach(({ src }) => src && URL.revokeObjectURL(src))
    // Clear preview state
    setFiles([])
    // Clear RHF value
    setValue(attachments.id, [], { shouldDirty: true })
  }

  const removeFile = (index: number) => {
    // Clean up object URL if needed
    setFiles((prev) => {
      if (prev[index] && prev[index].src) {
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      files.forEach(({ src }) => src && URL.revokeObjectURL(src))
    }
  }, [files])

  // Derived values
  const total_size = files.reduce((acc, f) => acc + f.file.size, 0)
  const total_qty = files.length
  const errorMessage = errors[attachments.id]?.message as string | undefined

  return {
    previewFiles: { files, total_size, total_qty },
    getRootProps,
    getInputProps,
    isDragActive,
    clearFiles,
    removeFile,
    errorMessage,
  }
}
