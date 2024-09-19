import { AuthenticatedNavbar } from '@/components/navbar/AuthenticatedNavbar'
import { keepSessionUpdated } from '@/actions/authentication/session'
import { Providers } from './providers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await keepSessionUpdated()

  return (
    <Providers>
      <div className="mx-auto min-h-screen max-w-3xl bg-zinc-50 shadow">
        <AuthenticatedNavbar />
        {children}
      </div>
    </Providers>
  )
}
