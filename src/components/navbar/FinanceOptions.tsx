import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Wallet,
  Grid2x2Plus,
  CreditCard,
  PiggyBank,
  ArrowUpFromLine,
  ArrowDownToLine,
} from 'lucide-react'
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
            onClick={() => replace('/methods')}
            className="cursor-pointer"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Methods</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => replace('/payments')}
            className="cursor-pointer"
          >
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            <span>Payments</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => replace('/receipts')}
            className="cursor-pointer"
          >
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            <span>Receipts</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => replace('/savings')}
            className="cursor-pointer"
          >
            <PiggyBank className="mr-2 h-4 w-4" />
            <span>Savings</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
