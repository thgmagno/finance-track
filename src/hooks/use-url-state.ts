import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function useUrlState() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const getParam = (key: string) => {
    return searchParams.get(key)
  }

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return {
    getParam,
    setParam,
  }
}
