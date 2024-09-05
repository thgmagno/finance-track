import { KVUserDataFetcher } from '@/services'
import { UserDataFetcher } from '@/services/userDataFetcher'
import Link from 'next/link'

export default async function Users() {
  const usersDataFetcher: UserDataFetcher = new KVUserDataFetcher()
  const users = await usersDataFetcher.fetchAllUsers()

  if (!users) return null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-5">
      {users.map((user) => (
        <Link
          key={user.email}
          href={`/users/${user.name.toLowerCase()}`}
          className="hover:font-medium hover:underline"
        >
          {user.name} - {user.email}
        </Link>
      ))}
    </div>
  )
}
