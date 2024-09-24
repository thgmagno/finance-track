import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore()

  return (
    <main>
      <div className="flex items-center justify-center space-x-3 py-20"></div>
    </main>
  )
}
