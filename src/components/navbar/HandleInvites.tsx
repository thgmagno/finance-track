import { acceptInviteCluster, rejectInviteCluster } from '@/actions/clusters'
import {
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { DataUser } from '@/lib/models/dataUser'
import { Globe, Check, X } from 'lucide-react'

interface Props {
  dataUser: DataUser
}

export function HandleInvites({ dataUser }: Props) {
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
                <span className="font-medium text-emerald-500">Accept</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRejectInvite(invite.clusterId)}
                className="cursor-pointer"
              >
                <X className="mr-2 h-4 w-4 text-red-500" strokeWidth={3} />
                <span className="font-medium text-red-500">Reject</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      ))}

      <DropdownMenuSeparator />
    </>
  )
}
