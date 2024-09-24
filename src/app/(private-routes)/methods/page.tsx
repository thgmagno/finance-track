import { DataTable } from '@/components/common/DataTable'
import { columns } from './columns'
import { getMethods } from '@/server/actions/methods'
import { AddButton, DrawerMethod } from './drawer'

export default async function Methods() {
  const methods = await getMethods()

  console.log('page: ', methods)

  return (
    <main className="px-2 md:px-5">
      <AddButton />
      <DataTable columns={columns} data={methods ?? []} />
      <DrawerMethod />
    </main>
  )
}
