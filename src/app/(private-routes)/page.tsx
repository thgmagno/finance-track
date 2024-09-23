import { CreateTransactionTrigger } from '@/components/drawer/CreateTransactionTrigger'
import { ExpenseForm } from '@/components/drawer/Expense'
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()

  return (
    <main>
      <CreateTransactionTrigger />
      <ExpenseForm />
    </main>
  )
}
