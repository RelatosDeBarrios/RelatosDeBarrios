'use client'

interface FieldErrorProps {
  errors?: string[]
}

export const FieldError = ({ errors }: FieldErrorProps) => {
  if (!errors || errors.length === 0) {
    return null
  }

  return (
    <div className='text-hub-error mt-1 text-sm'>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  )
}

