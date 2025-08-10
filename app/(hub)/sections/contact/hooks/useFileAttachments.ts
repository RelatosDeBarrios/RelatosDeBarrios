import { useCallback, useRef, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import type { AttachmentsType, DropzoneFile } from '../types/attachments'
import {
  processImageFile,
  processNonImageFile,
  createDataTransfer,
} from '../utils/fileUtils'

export function useFileAttachments(attachments: AttachmentsType) {
  const [files, setFiles] = useState<DropzoneFile[]>([])
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Process new files
      const processedFiles = await Promise.all(
        acceptedFiles.map((file) =>
          file.type.startsWith('image/')
            ? processImageFile(file)
            : Promise.resolve(processNonImageFile(file))
        )
      )
      // Add to state
      setFiles((prev) => [...prev, ...processedFiles])

      // Update files in hidden input to send it with form submission
      if (hiddenInputRef.current) {
        const allFiles = [...files, ...processedFiles].map((f) => f.file)
        const dataTransfer = createDataTransfer(allFiles)
        hiddenInputRef.current.files = dataTransfer.files
      }
    },
    [files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: attachments.accept,
  })

  const clearFiles = () => {
    // Cleanup all object URLs
    files.forEach(({ src }) => src && URL.revokeObjectURL(src))
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = ''
      const dataTransfer = new DataTransfer()
      hiddenInputRef.current.files = dataTransfer.files
    }
    setFiles([])
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
  const attachmentsFiles = files.map((f) => f.file)

  return {
    previewFiles: { files, total_size, total_qty },
    attachmentsFiles,
    hiddenInputRef,
    getRootProps,
    getInputProps,
    isDragActive,
    clearFiles,
  }
}
