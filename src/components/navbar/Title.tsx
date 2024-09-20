'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb } from '../common/Breadcrumb'

export function Title() {
  const pathname = usePathname()
  const title = formatTitle(pathname)

  if (pathname === '/') {
    return <h1>Finance Track</h1>
  }

  return <Breadcrumb page={title} />
}

function formatTitle(title: string) {
  return title
    .replace('/', '')
    .replace('-', ' ')
    .split(' ')
    .map((split) =>
      String(split).charAt(0).toUpperCase().concat(String(split).slice(1)),
    )
    .join(' ')
    .trim()
}
