import z from 'zod'
import { CONTACT } from '../content'

const MAX_FILE_SIZE = CONTACT.form.attachments.maxSize * 1024 * 1024
const ACCEPT = CONTACT.form.attachments.accept
const ACCEPTED_MIME_TYPES = Object.keys(ACCEPT)

export const AttachmentSchema = z.object({
  file: z.instanceof(File, { message: 'Archivo inválido' })
    .refine(file => file.size <= MAX_FILE_SIZE, `El archivo no debe exceder ${CONTACT.form.attachments.maxSize}MB`)
    .refine(file => ACCEPTED_MIME_TYPES.includes(file.type), 'Formato de archivo no soportado')
})

export const AttachmentsArraySchema = z.array(AttachmentSchema)

export type AttachmentSchemaType = z.infer<typeof AttachmentSchema>
