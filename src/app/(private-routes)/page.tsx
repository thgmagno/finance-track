import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { listUsers } from '@/actions/userActions'
import LineChartExample from '@/components/charts/lineChartExample'
import { CurrentMonthDetails } from '@/components/charts/currentMonthDetails'

export default async function Home() {
  noStore()

  const users = await listUsers()

  return (
    <main>
      <LineChartExample />
      <CurrentMonthDetails />
    </main>
  )
}
