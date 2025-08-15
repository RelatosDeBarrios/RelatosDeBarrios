// API route paths
// const BLOB_UPLOAD_URL = '/api/blob-upload'
// const VALIDATE_IP_URL = '/api/validate-ip'

// import { useActionState } from 'react'
import { SendEmailAction } from '../types/action'
import { validateForm } from '../utils/formValidation'
import { useFormStore } from '../store/formStore'
import { validateIp } from '../utils/validateIp'

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

    // validate IP address
    // const { allowed, message } = await validateIp('/api/validate-ip')
    //
    // if (!allowed) {
    //   setFieldErrors({ form_submit: message })
    // }

    // Start Upload phase
    setTimeout(() => {
      setPhase('uploading')
      setTimeout(() => {
        setPhase('submitting')
        setTimeout(() => {
          setPhase('success')
        }, 3000) // mocking submitting delay
      }, 5000) // mocking upload delay
    }, 0)

    // Next: setPhase('submitting') -> await action(res.data)
    // On success: setPhase('success') and clear errors
  }

  return {
    handleSubmit,
    action,
  }
}
