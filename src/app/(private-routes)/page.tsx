import { userService } from '@/services/userService'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()

  const users = await userService.fetchAllUsers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>

      <div className="my-5 flex flex-col space-y-2 rounded-md border p-3 shadow">
        <label>Usuários:</label>
        {users.map((user) => (
          <Link
            href={`/users/${user.name}`}
            key={user.email}
            className="hover:underline"
          >
            {user.name} - {user.email}
          </Link>
        ))}
      </div>
      <div className="my-5 flex flex-col space-y-2 rounded-md border p-3 shadow">
        <label>Clusters:</label>
      </div>
    </main>
  )
}
