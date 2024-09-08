import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  title: string
  paramToDismiss: string
}

export function ButtonDismiss({
  title,
  paramToDismiss,
  className,
  ...rest
}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(paramToDismiss)
    replace(params ? `${pathname}?${params.toString()}` : pathname)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center rounded-md border border-zinc-100 bg-zinc-300/60 p-2 shadow transition-all duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {title}
    </button>
  )
}
