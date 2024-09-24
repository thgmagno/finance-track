import { AuthenticatedNavbar } from '@/components/navbar/AuthenticatedNavbar'
import { Providers } from './providers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col bg-zinc-50 shadow">
        <AuthenticatedNavbar />
        {children}
      </main>
    </Providers>
  )
}
