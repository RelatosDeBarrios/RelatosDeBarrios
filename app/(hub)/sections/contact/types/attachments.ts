import { Accept } from 'react-dropzone'
import { InputType } from './form'

export type DropzoneFile = {
  file: File
  src?: string
  width?: number
  height?: number
  type: string
  name: string
}

export interface AttachmentsType extends InputType {
  maxSize: number
  accept: Accept
}
