import { CONTACT } from '../content'

// Common validation constraints for files
export const FILE_CONSTRAINTS = {
  maxFiles: 5, // Maximum number of files
  maxSizePerFile: CONTACT.form.attachments.maxSize * 1024 * 1024, // In bytes (from MB)
  maxTotalSize: CONTACT.form.attachments.maxSize * 2 * 1024 * 1024, // In bytes (2x single file max)
  acceptedTypes: [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Videos
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
  ],
}

/**
 * Validates file constraints (size, count, type) before upload
 *
 * @param files - Files to validate
 * @returns Validation result with any constraint violations
 */
export function validateFileConstraints(files: File[]): {
  valid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  // Check number of files
  if (files.length > FILE_CONSTRAINTS.maxFiles) {
    errors.maxFiles = `Máximo ${FILE_CONSTRAINTS.maxFiles} archivos permitidos.`
  }

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  if (totalSize > FILE_CONSTRAINTS.maxTotalSize) {
    errors.totalSize = `El tamaño total excede el límite de ${Math.round(FILE_CONSTRAINTS.maxTotalSize / (1024 * 1024))}MB.`
  }

  // Check individual file size and type
  const oversizedFiles: string[] = []
  const invalidTypeFiles: string[] = []

  files.forEach((file) => {
    // Check file size
    if (file.size > FILE_CONSTRAINTS.maxSizePerFile) {
      oversizedFiles.push(file.name)
    }

    // Check file type
    if (
      !FILE_CONSTRAINTS.acceptedTypes.includes(file.type) &&
      !FILE_CONSTRAINTS.acceptedTypes.some(
        (type) =>
          type.endsWith('/*') && file.type.startsWith(type.replace('/*', ''))
      )
    ) {
      invalidTypeFiles.push(file.name)
    }
  })

  if (oversizedFiles.length > 0) {
    errors.fileSize = `${oversizedFiles.length > 1 ? 'Algunos archivos exceden' : 'Un archivo excede'} el tamaño máximo de ${Math.round(FILE_CONSTRAINTS.maxSizePerFile / (1024 * 1024))}MB.`
  }

  if (invalidTypeFiles.length > 0) {
    errors.fileType = `${invalidTypeFiles.length > 1 ? 'Algunos archivos tienen' : 'Un archivo tiene'} un formato no permitido.`
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
