import React from 'react'
import Image from 'next/image'
import { Book, X } from 'lucide-react'
import { truncate } from '@/utils/string'
import type { DropzoneFile } from '../types/attachments'
import { cn } from '@/utils/css'

interface FilePreviewItemProps {
  file: DropzoneFile
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const FilePreviewItem = ({ file, onClick }: FilePreviewItemProps) => {
  const DeleteIcon = () => (
    <X className='bg-hub-error/80 text-hub-background absolute -top-1 -right-1 size-4 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100' />
  )

  if (file.src) {
    return (
      <div className='group relative'>
        <Image
          onClick={onClick}
          src={file.src}
          alt={file.name}
          width={file.width}
          height={file.height}
          className='max-h-20 w-auto rounded object-contain'
        />
        <DeleteIcon />
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-hub-background/50 group relative flex size-20 flex-col items-center justify-center rounded p-1'
      )}
    >
      <Book strokeWidth={1} className='text-hub-text size-4 shrink-0' />
      <span className='text-hub-text w-full text-center text-xs wrap-break-word'>
        {truncate(file.name, 20)}
      </span>
      <span className='text-hub-text/70 text-[10px]'>
        {file.name.split('.')[1]}
      </span>
      <DeleteIcon />
    </div>
  )
}
