import { Payment, columns } from './columns'
import { DataTable } from '@/components/common/DataTable'
import { Mocks } from './mocks'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return Mocks
}

export default async function CategoriesPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
