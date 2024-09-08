import { getSession } from '@/actions/authActions'
import { Navbar } from '@/components/navbar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { name, cluster } = await getSession()

  return (
    <div className="custom-container">
      <Navbar name={name as string} cluster={String(cluster)} />
      {children}
    </div>
  )
}
