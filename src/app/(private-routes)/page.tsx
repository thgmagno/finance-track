import { userService } from '@/services/userService'
import Link from 'next/link'

export default async function Home() {
  const users = await userService.fetchAllUsers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>
      {users.map((user) => (
        <Link href={`/users/${user.name}`} key={user.email}>
          {user.name} - {user.email}
        </Link>
      ))}
    </main>
  )
}
