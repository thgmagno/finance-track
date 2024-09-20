import { PageContainer, PageInsertButton } from '@/components/common/Page'
import { Tabs } from '@/components/common/Tabs'
import { CategoryExpense } from '@/components/drawer/CategoryExpense'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function CategoriesPage() {
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
  return (
    <PageContainer>
      <CategoryExpense tooltip="Add Expense Category" />
    </PageContainer>
  )
}

function Receipts() {
  return (
    <PageContainer>
      <PageInsertButton tooltip="Add Receipt Category">
        <Button className="rounded-full">
          <Plus />
        </Button>
      </PageInsertButton>
    </PageContainer>
  )
}

function Savings() {
  return (
    <PageContainer>
      <PageInsertButton tooltip="Add Saving Category">
        <Button className="rounded-full">
          <Plus />
        </Button>
      </PageInsertButton>
    </PageContainer>
  )
}
