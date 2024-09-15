import { RegisterForm } from '@/components/authentication/RegisterForm'

export default async function CreateAccount() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12">
      <RegisterForm />
    </main>
  )
}
