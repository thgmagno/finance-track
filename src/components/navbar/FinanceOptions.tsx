import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Wallet, Grid2x2Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FinanceOptions() {
  const { replace } = useRouter()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Wallet className="mr-2 h-4 w-4" />
        <span>Finance</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem
            onClick={() => replace('/categories')}
            className="cursor-pointer"
          >
            <Grid2x2Plus className="mr-2 h-4 w-4" />
            <span>Categories</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => replace('/payment-methods')}
            className="cursor-pointer"
          >
            <Grid2x2Plus className="mr-2 h-4 w-4" />
            <span>Payment Methods</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
