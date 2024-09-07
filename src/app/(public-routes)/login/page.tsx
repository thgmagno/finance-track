import { LoginForm } from '@/components/authenticate'

export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>
      <LoginForm />
    </main>
  )
}
