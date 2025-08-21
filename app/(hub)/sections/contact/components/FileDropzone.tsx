import React from 'react'
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone'

interface FileDropzoneProps {
  getRootProps: () => DropzoneRootProps
  getInputProps: () => DropzoneInputProps
  isDragActive: boolean
  children: React.ReactNode
  className?: string
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  getRootProps,
  getInputProps,
  children,
  className = '',
}) => (
  <div {...getRootProps()} className={className}>
    {children}
    <input {...getInputProps()} />
  </div>
)
