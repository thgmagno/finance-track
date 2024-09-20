'use client'

import { User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuItemLogout } from './DropdownMenuItemLogout'
import { ManageInvitations } from './ManageInvitations'
import { ManageSettings } from './ManageSettings'
import { NewCluster } from './NewCluster'
import { DataUser } from '@/lib/models/dataUser'
import { HandleInvites } from './HandleInvites'
import { FinanceOptions } from './FinanceOptions'

interface Props {
  username: string
  clusterName?: string
  dataUser: DataUser
}

export function DropdownUserMenu({ username, clusterName, dataUser }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel className="cursor-default">
          {username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {clusterName ? (
            <>
              <DropdownMenuLabel className="cursor-default">
                {clusterName}
              </DropdownMenuLabel>
              <ManageInvitations />
            </>
          ) : (
            <NewCluster />
          )}
          {dataUser.invites.length > 0 && <HandleInvites dataUser={dataUser} />}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {clusterName && <FinanceOptions />}
        <ManageSettings />
        <DropdownMenuSeparator />
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
