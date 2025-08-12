import { AttachmentsArraySchema } from '../schemas/attachmentSchema'
import { FormSchema } from '../schemas/formSchema'
import { DropzoneFile } from '../types/attachments'
import { ZodError } from 'zod'

export type ValidationResult = {
  success: boolean
  errors?: {
    [key: string]: string[]
  }
  message?: string
}

/**
 * Validates form data and file attachments
 * @param formData Form data from the form
 * @param files Array of files from useFileAttachments
 * @returns ValidationResult with success status and any errors
 */
export function validateForm(formData: FormData, files: DropzoneFile[]): ValidationResult {
  // Basic validation result structure
  const result: ValidationResult = {
    success: true,
    errors: {}
  }

  try {
    // 1. Validate form fields with FormSchema
    const formValues = {
      name: formData.get('form_name') as string,
      email: formData.get('form_email') as string,
      commentary: formData.get('form_commentary') as string || undefined,
      contribution: formData.get('form_project') as string,
    }

    FormSchema.parse(formValues)

    // 2. Validate file attachments if present
    if (files.length > 0) {
      // Convert DropzoneFile[] to File[] for schema validation
      const fileObjects = files.map(df => df.file)
      try {
        AttachmentsArraySchema.parse(fileObjects.map(file => ({ file })))
      } catch (error) {
        if (error instanceof ZodError) {
          // Handle file validation errors specifically
          result.success = false
          result.errors = {
            ...result.errors,
            attachments: error.errors.map(e => {
              // Extract more specific error message
              const fieldPath = e.path.join('.');
              const fileIndex = parseInt(fieldPath.split('.')[0]) || 0;
              const fileName = files[fileIndex]?.name || 'archivo';
              
              if (e.message.includes('exceder')) {
                return `${fileName}: excede el tamaño máximo permitido`;
              } else if (e.message.includes('formato')) {
                return `${fileName}: formato no soportado`;
              }
              return `${fileName}: ${e.message}`;
            })
          }
        }
      }
    }

  } catch (error) {
    // Handle form validation errors
    if (error instanceof ZodError) {
      result.success = false;
      result.errors = error.errors.reduce((acc, curr) => {
        const path = curr.path[0] as string;
        if (!acc[path]) {
          acc[path] = [];
        }
        acc[path].push(curr.message);
        return acc;
      }, {} as Record<string, string[]>);
    } else {
      // Handle unexpected errors
      result.success = false;
      result.message = 'Error inesperado al validar el formulario';
    }
  }

  return result;
}