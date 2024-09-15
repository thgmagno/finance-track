import { DropdownUserMenu } from './DropdownUserMenu'

export function AuthenticatedNavbar() {
  const mock = {
    username: 'Thiago Magno',
    clusterName: 'My Cluster',
  }
  return (
    <nav className="flex justify-between p-5">
      <h1>Finance Track</h1>
      <DropdownUserMenu
        username={mock.username}
        clusterName={mock.clusterName}
      />
    </nav>
  )
}
