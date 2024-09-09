import { unstable_noStore as noStore } from 'next/cache'
import LineChartExample from '@/components/charts/lineChartExample'
import { CurrentMonthDetails } from '@/components/charts/currentMonthDetails'
import { LookingClusterForm } from '@/components/forms/lookingClusterForm'
import { RegistrationButtonTrigger } from '@/components/modals/registrationButtonTrigger'

export default async function Home() {
  noStore()

  return (
    <main>
      <LineChartExample />
      <CurrentMonthDetails />
      <LookingClusterForm />
      <RegistrationButtonTrigger />
    </main>
  )
}
