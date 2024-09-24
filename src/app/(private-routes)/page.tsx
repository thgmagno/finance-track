import { Button } from '@/components/ui/button'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

export default async function Home() {
  noStore()

  return (
    <main>
      <div className="flex items-center justify-center space-x-3 py-20">
        <Link href="/cache">
          <Button>Test cache</Button>
        </Link>
      </div>
    </main>
  )
}
