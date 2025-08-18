'use client'
import { cn } from '@/utils/css'
import { useFormContext } from 'react-hook-form'
import { InputType } from '../types/form'
import { FieldError } from './FieldError'

interface InputFormProps {
  inputContent: InputType
  className?: string
}

export const FormInput = ({ inputContent, className }: InputFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const Element = inputContent.type === 'textarea' ? Textarea : Input
  const errorMessage = errors[inputContent.id]?.message as string | undefined

  return (
    <>
      <label
        htmlFor={inputContent.id}
        className='text-hub-text block font-medium'
      >
        {inputContent.label}
        {inputContent.required && (
          <span className='text-hub-error ml-1 align-middle text-sm'>*</span>
        )}
        <Element
          inputContent={inputContent}
          register={register}
          className={cn(
            className,
            'border-hub-border focus:ring-hub-accent bg-hub-background/60 w-full rounded-lg border px-3 py-2 focus:ring-1 focus:outline-none md:px-4 md:py-3'
          )}
        />
      </label>
      {errorMessage && <FieldError message={errorMessage} />}
    </>
  )
}

interface ElementProps extends Omit<InputFormProps, 'fieldErrors'> {
  register: ReturnType<typeof useFormContext>['register']
}

const Input = ({ inputContent, className, register }: ElementProps) => {
  return (
    <input
      type={inputContent.type}
      id={inputContent.id}
      placeholder={inputContent.placeholder}
      autoComplete={inputContent.autocomplete}
      className={className}
      {...register(inputContent.id, {
        required:
          inputContent.required &&
          (inputContent.requiredMessage || 'Este campo es requerido'),
      })}
    />
  )
}

const Textarea = ({ inputContent, className, register }: ElementProps) => {
  return (
    <textarea
      id={inputContent.id}
      placeholder={inputContent.placeholder}
      rows={5}
      className={className}
      {...register(inputContent.id, {
        required:
          inputContent.required &&
          (inputContent.requiredMessage || 'Este campo es requerido'),
      })}
    />
  )
}
