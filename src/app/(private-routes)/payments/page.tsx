import { columns } from './columns'
import { DataTable } from '@/components/common/DataTable'
import { mockData } from './mocks'
import { CategoryProvider } from '@/components/common/CategoryProvider'

interface PageProps {
  searchParams?: {
    status?: string
    category?: string
  }
}

export default async function PaymentsPage({ searchParams }: PageProps) {
  const data = await getData(searchParams?.status, searchParams?.category)
  const categories = Array.from(
    new Set(data.map((item) => item.category?.description).filter(Boolean)),
  )

  return (
    <div className="container mx-auto pb-32 pt-5">
      <DataTable columns={columns} data={data} />
      <CategoryProvider categories={categories} />
    </div>
  )
}

async function getData(status?: string, category?: string) {
  const response = await prisma?.transaction.findMany({
    include: { category: true },
  })

  const mock = mockData
  const filtered = mock.filter((item) => {
    const matchesStatus = status
      ? String(item.status).toLowerCase() === status
      : true

    const matchesCategory = category
      ? item.category?.description?.toLowerCase() === category.toLowerCase()
      : true

    return matchesStatus && matchesCategory
  })

  return filtered
}
