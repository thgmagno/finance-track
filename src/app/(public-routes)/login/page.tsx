import { LoginForm } from '@/components/authentication/LoginForm'

export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12">
      <LoginForm />
    </main>
  )
}
