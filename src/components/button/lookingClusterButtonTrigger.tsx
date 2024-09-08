'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function LookingClusterButtonTrigger() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('create')
    params.set('looking', 'cluster')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm hover:underline"
    >
      looking for a cluster?
    </button>
  )
}
