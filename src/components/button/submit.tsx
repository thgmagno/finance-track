import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  title: string
}

export function ButtonSubmit({ title, className, ...rest }: Props) {
  const { pending } = useFormStatus()

  const Spinner = () => (
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
  )

  return (
    <button
      type="submit"
      className={`flex items-center justify-center rounded-md border p-2 shadow disabled:cursor-not-allowed ${className}`}
      disabled={pending}
      {...rest}
    >
      {pending ? <Spinner /> : title}
    </button>
  )
}
