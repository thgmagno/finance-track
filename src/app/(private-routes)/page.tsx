import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'

export default async function Home() {
  noStore()

  const token = cookies().get(process.env.COOKIE_NAME!)?.value

  return (
    <main>
      <p className="p-6 text-2xl">{String(token).slice(-5)}</p>
    </main>
  )
}
