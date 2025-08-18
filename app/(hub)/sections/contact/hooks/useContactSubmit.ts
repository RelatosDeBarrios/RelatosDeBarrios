// API route paths
// const BLOB_UPLOAD_URL = '/api/blob-upload'
// const VALIDATE_IP_URL = '/api/validate-ip'

import { SendEmailAction } from '../types/action'

interface UseContactSubmitProps {
  action: SendEmailAction
}

// This hook is no longer needed with RHF, but retained as a stub for compatibility
export const useContactSubmit = ({ action }: UseContactSubmitProps) => {
  return {
    action
  }
}