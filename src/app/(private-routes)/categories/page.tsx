import { getCategory } from '@/actions/categories'
import { columns } from './columns'
import { CategoryForm } from '@/components/drawer/Category'
import { DataTableCommun } from '@/components/dataTable/DataTableCommun'

export default async function CategoriesPage() {
  const data = await getCategory()

  return (
    <div className="container mx-auto pb-32 pt-5">
      <DataTableCommun
        columns={columns}
        data={data}
        query={{ create: 'category' }}
      />
      <CategoryForm />
    </div>
  )
}
