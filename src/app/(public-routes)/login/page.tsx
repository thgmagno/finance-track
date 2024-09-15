import { LoginForm } from '@/components/authentication/LoginForm'

export default async function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pb-40 pt-20">
      <LoginForm />
    </main>
  )
}
