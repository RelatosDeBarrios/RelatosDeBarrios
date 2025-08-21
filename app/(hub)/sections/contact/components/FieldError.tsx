'use client'

interface FieldErrorProps {
  message?: string
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) {
    return null
  }

  return (
    <div className='text-hub-error mt-1 text-sm'>
      <p>{message}</p>
    </div>
  )
}
