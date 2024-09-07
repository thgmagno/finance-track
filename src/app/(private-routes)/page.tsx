import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { listUsers } from '@/actions/userActions'

export default async function Home() {
  noStore()

  const users = await listUsers()

  return <main></main>
}
