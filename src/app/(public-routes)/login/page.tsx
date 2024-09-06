import { LoginForm } from '@/components/authenticate'
import { db } from '@/db'

export default async function Login() {
  // await db
  //   .insertInto('users')
  //   .values({ name: 'thiago', email: 'thgmgn@gmail.com', password: 'magno' })
  //   .execute()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>
      <LoginForm />
    </main>
  )
}
