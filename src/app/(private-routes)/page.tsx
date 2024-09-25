import { Button } from '@/components/ui/button'
import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  noStore()

  const token = String(cookies().get('cs213jw4')?.value).slice(-10)

  return (
    <main>
      <div className="flex items-center justify-center space-x-3 py-20">
        <Link href="/cache">
          <Button>Test cache</Button>
        </Link>
        <p>{token}</p>
      </div>
    </main>
  )
}
