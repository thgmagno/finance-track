'use client'

import { Check, Globe, User, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuItemLogout } from './DropdownMenuItemLogout'
import { ManageInvitations } from './ManageInvitations'
import { ManageSettings } from './ManageSettings'
import { NewCluster } from './NewCluster'
import { DataUser } from '@/lib/models/dataUser'
import { acceptInviteCluster, rejectInviteCluster } from '@/actions/clusters'
import { toast } from '@/hooks/use-toast'

interface Props {
  username: string
  clusterName?: string
  dataUser: DataUser
}

export function DropdownUserMenu({ username, clusterName, dataUser }: Props) {
  const handleAcceptInvite = async (clusterId: string) => {
    const { success, message } = await acceptInviteCluster(clusterId)
    if (success) {
      return toast({
        description: message,
      })
    } else {
      return toast({
        description: message,
        variant: 'destructive',
      })
    }
  }
  const handleRejectInvite = async (clusterId: string) => {
    const { success, message } = await rejectInviteCluster(clusterId)
    if (success) {
      return toast({
        description: message,
      })
    } else {
      return toast({
        description: message,
        variant: 'destructive',
      })
    }
  }

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
          {dataUser.invites.length > 0 && (
            <>
              <DropdownMenuLabel className="cursor-default">
                Invitations
              </DropdownMenuLabel>

              {dataUser.invites.map((invite) => (
                <DropdownMenuSub key={invite.clusterId}>
                  <DropdownMenuSubTrigger>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{invite.clusterName}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => handleAcceptInvite(invite.clusterId)}
                        className="cursor-pointer"
                      >
                        <Check
                          className="mr-2 h-4 w-4 text-emerald-500"
                          strokeWidth={3}
                        />
                        <span className="font-medium text-emerald-500">
                          Accept
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRejectInvite(invite.clusterId)}
                        className="cursor-pointer"
                      >
                        <X
                          className="mr-2 h-4 w-4 text-red-500"
                          strokeWidth={3}
                        />
                        <span className="font-medium text-red-500">Reject</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ))}

              <DropdownMenuSeparator />
            </>
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
