'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function NewClusterButtonTrigger() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.set('create', 'cluster')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <button onClick={handleClick} className="text-xs text-sky-600">
      create cluster
    </button>
  )
}
