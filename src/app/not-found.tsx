import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-muted-foreground">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className={cn('my-5', buttonVariants({ variant: 'secondary' }))}
      >
        Return Home
      </Link>
    </div>
  )
}
