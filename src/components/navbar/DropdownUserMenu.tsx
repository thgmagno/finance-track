'use client'

import { Plus, Settings, User, UserPlus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { DropdownMenuItemLogout } from './DropdownMenuItemLogout'

interface Props {
  username: string
  clusterName?: string
}

export function DropdownUserMenu({ username, clusterName }: Props) {
  const { replace } = useRouter()

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
              <DropdownMenuItem
                onClick={() => alert('oi')}
                className="cursor-pointer"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => alert('oi')}
              className="cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>New Cluster</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => alert('oi')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
