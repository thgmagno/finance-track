import { RegisterForm } from '@/components/auth/RegisterForm'

export default async function CreateAccount() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <RegisterForm />
    </main>
  )
}
