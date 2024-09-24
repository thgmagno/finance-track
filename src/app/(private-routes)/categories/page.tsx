import { getCategories } from '@/server/actions/categories'
import { AddButton, DrawerCategory } from './drawer'
import { DataTable } from '@/components/common/DataTable'
import { columns } from './columns'

export default async function Categories() {
  const categories = await getCategories()

  return (
    <main className="px-2 md:px-5">
      <AddButton />
      <DataTable columns={columns} data={categories ?? []} />
      <DrawerCategory />
    </main>
  )
}
