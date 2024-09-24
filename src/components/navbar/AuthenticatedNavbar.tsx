import { DropdownUserMenu } from './DropdownUserMenu'
import { Title } from './Title'
import { getSession } from '@/server/actions/session'

export async function AuthenticatedNavbar() {
  const { name, cluster } = await getSession()

  return (
    <nav className="flex justify-between p-5">
      <Title />
      <DropdownUserMenu username={String(name)} clusterName={String(cluster)} />
    </nav>
  )
}
