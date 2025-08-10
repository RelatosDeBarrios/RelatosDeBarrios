import React from 'react'
import type { DropzoneFile } from '../types/attachments'
import { FilePreviewItem } from './FilePreviewItem'

interface FilePreviewGridProps {
  files: DropzoneFile[]
}

export const FilePreviewGrid: React.FC<FilePreviewGridProps> = ({ files }) => (
  <div className='mt-4 flex flex-wrap justify-center gap-2'>
    {files.map((file, index) => (
      <FilePreviewItem key={index + file.name} file={file} />
    ))}
  </div>
)
