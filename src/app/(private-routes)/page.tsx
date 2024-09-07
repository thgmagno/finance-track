import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { listUsers } from '@/actions/userActions'
import LineChartExample from '@/components/charts/lineChartExample'

export default async function Home() {
  noStore()

  const users = await listUsers()

  return (
    <main>
      <LineChartExample />
    </main>
  )
}
