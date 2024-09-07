import { getSession } from '@/actions/authActions'
import { Navbar } from '@/components/navbar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { name } = await getSession()

  return (
    <div className="custom-container">
      <Navbar name={name as string} />
      {children}
    </div>
  )
}
