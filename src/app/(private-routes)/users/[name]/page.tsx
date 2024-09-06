import { userService } from '@/services/userService'
import { redirect } from 'next/navigation'

export default async function User({ params }: { params: { name: string } }) {
  const user = await userService.fetchUser(params.name)

  if (!user) redirect('/')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">{user.name}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}
