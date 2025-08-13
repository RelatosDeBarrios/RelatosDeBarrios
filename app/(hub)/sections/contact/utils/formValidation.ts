'use client'
import z, { ZodError } from 'zod'
import { FormSchema } from '../schemas/formSchema'

export type ValidationFieldErrors = Record<string, string[]>
export interface ValidationResultOk<T> {
  success: true
  data: T
}
export interface ValidationResultErr {
  success: false
  fieldErrors: ValidationFieldErrors
  globalErrors?: string[]
}
export type ValidationResult<T> = ValidationResultOk<T> | ValidationResultErr

export function validateForm(formData: FormData): ValidationResult<unknown> {
  const obj = Object.fromEntries(formData.entries())

  try {
    const result = FormSchema.safeParse(obj)

    if (!result.success) {
      const flat = z.flattenError(result.error)
      const fieldErrors: ValidationFieldErrors = Object.fromEntries(
        Object.entries(flat.fieldErrors).map(([k, v]) => [k, v ?? []])
      )

      return {
        success: false,
        fieldErrors,
      }
    }

    return { success: true, data: result.data }
  } catch (error) {
    const isZod = error instanceof ZodError
    return {
      success: false,
      fieldErrors: isZod
        ? (z.flattenError(error).fieldErrors as ValidationFieldErrors)
        : {},
      globalErrors: ['Error inesperado al validar el formulario'],
    }
  }
}
