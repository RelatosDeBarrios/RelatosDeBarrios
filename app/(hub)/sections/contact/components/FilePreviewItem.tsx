import React from 'react'
import Image from 'next/image'
import { Book } from 'lucide-react'
import { truncate } from '@/utils/string'
import type { DropzoneFile } from '../types/attachments'

export const FilePreviewItem: React.FC<{ file: DropzoneFile }> = ({ file }) => {
  if (file.src) {
    return (
      <Image
        src={file.src}
        alt={file.name}
        width={file.width}
        height={file.height}
        className='max-h-[80px] w-auto rounded object-contain'
      />
    )
  }
  return (
    <div className='flex h-[80px] w-[100px] flex-col items-center justify-center rounded bg-gray-100 p-1'>
      <Book strokeWidth={1.4} className='text-hub-text mb-1 h-8 w-8' />
      <span className='w-full truncate text-center text-xs text-gray-700'>
        {truncate(file.name, 20)}
      </span>
      <span className='text-[10px] text-gray-400'>
        {file.type.split('/')[1]}
      </span>
    </div>
  )
}
