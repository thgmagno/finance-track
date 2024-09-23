import { Providers } from './providers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <div className="mx-auto min-h-screen max-w-3xl bg-zinc-50 shadow">
        {children}
      </div>
    </Providers>
  )
}
