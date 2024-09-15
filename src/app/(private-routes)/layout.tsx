import { AuthenticatedNavbar } from '@/components/navbar/AuthenticatedNavbar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl shadow">
      <AuthenticatedNavbar />
      {children}
    </div>
  )
}
