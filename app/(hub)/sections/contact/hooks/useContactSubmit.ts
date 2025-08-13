// API route paths
// const BLOB_UPLOAD_URL = '/api/blob-upload'
// const VALIDATE_IP_URL = '/api/validate-ip'

// import { useActionState } from 'react'
import { SendEmailAction } from '../types/action'
import { validateForm } from '../utils/formValidation'
import { useFormStore } from '../store/formStore'

interface UseContactSubmitProps {
  action: SendEmailAction
}

export const useContactSubmit = ({ action }: UseContactSubmitProps) => {
  const setPhase = useFormStore((s) => s.setPhase)
  const setFieldErrors = useFormStore((s) => s.setFieldErrors)

  const handleSubmit = async (formData: FormData) => {
    setPhase('validating')
    const res = validateForm(formData)

    if (!res.success) {
      setFieldErrors(res.fieldErrors)
      return
    }

    // Next: setPhase('uploading') -> upload blobs
    // Next: setPhase('submitting') -> await action(res.data)
    // On success: setPhase('success') and clear errors
  }

  return {
    handleSubmit,
    action,
  }
}
