import { CreateAccountForm } from '@/components/forms/createAccountForm'

export default async function CreateAccount() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>
      <CreateAccountForm />
    </main>
  )
}
