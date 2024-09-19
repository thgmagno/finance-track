import { getSession } from '@/actions/authentication/session'
import { DropdownUserMenu } from './DropdownUserMenu'
import { fetchDataUser } from '@/actions/users'

export async function AuthenticatedNavbar() {
  const { sub, name, cluster } = await getSession()
  const dataUser = await fetchDataUser(sub as string)

  return (
    <nav className="flex justify-between p-5">
      <h1>Finance Track</h1>
      <DropdownUserMenu
        username={String(name)}
        clusterName={String(cluster)}
        dataUser={dataUser}
      />
    </nav>
  )
}
