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

interface Props {
  username: string
  clusterName?: string
}

export function DropdownUserMenu({ username, clusterName }: Props) {
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ManageSettings />
        <DropdownMenuSeparator />
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
