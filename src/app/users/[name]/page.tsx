import { KVUserDataFetcher } from '@/services'
import { UserDataFetcher } from '@/services/userDataFetcher'
import { redirect } from 'next/navigation'

export default async function User({ params }: { params: { name: string } }) {
  const userDataFetcher: UserDataFetcher = new KVUserDataFetcher()
  const user = await userDataFetcher.fetchUser(params.name)

  if (!user) redirect('/users')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <p>
        <b>Nome</b>: {user.name}
      </p>
      <p>
        <b>Email</b>: {user.email}
      </p>
    </div>
  )
}
