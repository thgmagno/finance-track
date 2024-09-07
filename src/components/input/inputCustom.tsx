import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: string
  name: string
  placeholder?: string
  isInvalid?: boolean
  errorMessage?: string[]
}

export function InputCustom({
  label,
  type,
  name,
  placeholder,
  className,
  isInvalid,
  errorMessage,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
        className={clsx(`rounded-md border p-2 outline-none ${className}`, {
          'border-red-300 bg-red-50 text-red-500': isInvalid,
        })}
        {...rest}
      />
      {errorMessage && (
        <p className="my-1.5 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
