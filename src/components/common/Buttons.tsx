'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function ButtonFormSubmit({ title, className, ...rest }: Props) {
  const { pending } = useFormStatus()
  const Spinner = () => <Loader2 className="h-5 w-5 animate-spin" />

  return (
    <Button type="submit" className={className} disabled={pending} {...rest}>
      {pending ? <Spinner /> : title}
    </Button>
  )
}
