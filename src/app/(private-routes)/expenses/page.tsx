import { columns } from './columns'
import { CategoryProvider } from '@/components/common/CategoryProvider'
import { getTransactions } from '@/actions/transactions'
import { getCategory } from '@/actions/categories'
import { DataTableTransactions } from '@/components/dataTable/DataTableTransactions'

interface PageProps {
  searchParams?: {
    status?: string
    category?: string
    month?: string
    year?: string
  }
}

export default async function ExpensePage({ searchParams }: PageProps) {
  // const status = searchParams?.status
  const response = await getTransactions({
    categoryDescription: searchParams?.category,
    month: searchParams?.month,
    year: searchParams?.year,
  })

  if (!response.success) {
    if (response.message?.includes('create cluster')) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-muted-foreground">{response.message}</h1>
        </div>
      )
    }
    return <span>Error: {response.message}</span>
  }

  const categories = await getCategory('EXPENSE')

  return (
    <div className="container mx-auto pb-32 pt-5">
      <DataTableTransactions columns={columns} data={response.data as []} />
      <CategoryProvider categories={categories} />
    </div>
  )
}
