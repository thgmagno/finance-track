import { getSession } from '@/server/actions/session'
import { redirect } from 'next/navigation'

export default async function LayoutCategories({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { clusterId } = await getSession()
  if (!clusterId) redirect('/')

  return <>{children}</>
}
