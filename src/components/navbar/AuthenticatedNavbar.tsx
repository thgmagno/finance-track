import { getSession } from '@/actions/authentication/session'
import { DropdownUserMenu } from './DropdownUserMenu'

export async function AuthenticatedNavbar() {
  const { name, cluster } = await getSession()

  return (
    <nav className="flex justify-between p-5">
      <h1>Finance Track</h1>
      <DropdownUserMenu username={String(name)} clusterName={String(cluster)} />
    </nav>
  )
}
