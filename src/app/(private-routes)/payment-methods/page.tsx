import { Tabs } from '@/components/common/Tabs'

export default async function PaymentMethodsPage() {
  const triggers = [
    { value: 'expenses', label: 'Expenses' },
    { value: 'receipts', label: 'Receipts' },
    { value: 'savings', label: 'Savings' },
  ]

  const contents = [
    { value: 'expenses', children: <Expenses /> },
    { value: 'receipts', children: <Receipts /> },
    { value: 'savings', children: <Savings /> },
  ]

  return (
    <main className="px-5">
      <Tabs triggers={triggers} contents={contents} defaultValue="expenses" />
    </main>
  )
}

function Expenses() {
  return <p>Expenses</p>
}

function Receipts() {
  return <p>Receipts</p>
}

function Savings() {
  return <p>Savings</p>
}
