import { unstable_noStore as noStore } from 'next/cache'
import LineChartExample from '@/components/charts/lineChartExample'
import { CurrentMonthDetails } from '@/components/charts/currentMonthDetails'
import { ClusterForm } from '@/components/forms/clusterForm'
import { getSession } from '@/actions/authActions'
import { LookingClusterForm } from '@/components/forms/lookingClusterForm'
import { RegistrationButtonTrigger } from '@/components/button/registrationButtonTrigger'

export default async function Home() {
  noStore()

  const { sub } = await getSession()

  return (
    <main>
      <LineChartExample />
      <CurrentMonthDetails />
      <ClusterForm userId={sub as string} />
      <LookingClusterForm />
      <RegistrationButtonTrigger />
    </main>
  )
}
