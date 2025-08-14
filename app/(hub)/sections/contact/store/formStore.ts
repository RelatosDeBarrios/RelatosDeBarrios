import { create } from 'zustand'
import { FormFieldIds } from '../types/form'

export type FieldErrors = Record<FormFieldIds, string[]>

interface State {
  phase:
    | 'idle'
    | 'validating'
    | 'uploading'
    | 'submitting'
    | 'success'
    | 'error'
  pending: boolean
  fieldErrors: FieldErrors | null
  setPhase: (phase: State['phase']) => void
  setFieldErrors: (errors: FieldErrors | null) => void
  setFieldError: (id: FormFieldIds, messages: string[]) => void
  clearFieldError: (id: FormFieldIds) => void
}

export const useFormStore = create<State>((set) => ({
  phase: 'idle',
  pending: false,
  fieldErrors: null,
  setPhase: (phase) =>
    set({
      phase,
      pending:
        phase === 'validating' ||
        phase === 'uploading' ||
        phase === 'submitting',
    }),
  setFieldErrors: (errors) =>
    set({
      fieldErrors: errors,
      phase: errors ? 'error' : 'idle',
      pending: false,
    }),
  setFieldError: (id, messages) =>
    set((state) => ({
      fieldErrors: {
        ...(state.fieldErrors ?? ({} as FieldErrors)),
        [id]: messages,
      },
      phase: 'error',
      pending: false,
    })),
  clearFieldError: (id) =>
    set((state) => {
      if (!state.fieldErrors) return { fieldErrors: null }
      const { [id]: _removed, ...rest } = state.fieldErrors
      const next = (
        Object.keys(rest).length ? rest : null
      ) as FieldErrors | null
      return { fieldErrors: next }
    }),
}))
