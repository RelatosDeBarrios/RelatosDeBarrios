import React from 'react'
import type { DropzoneFile } from '../types/attachments'
import { FilePreviewItem } from './FilePreviewItem'

interface FilePreviewGridProps {
  files: DropzoneFile[]
  removeFile: (index: number) => void
}

export const FilePreviewGrid = ({
  files,
  removeFile,
}: FilePreviewGridProps) => (
  <div className='mt-4 flex flex-wrap justify-center gap-2'>
    {files.map((file, index) => (
      <FilePreviewItem
        key={index + file.name}
        file={file}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation()
          removeFile(index)
        }}
      />
    ))}
  </div>
)
