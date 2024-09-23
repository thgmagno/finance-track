'use client'

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  PiggyBank,
  Wallet,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

export function CreateTransactionTrigger() {
  const pathname = usePathname()
  const { replace } = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="fixed bottom-6 right-6 rounded-full bg-zinc-900 p-4 ring-2 ring-zinc-600"
      >
        <Wallet className="h-14 w-14 cursor-pointer text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-zinc-800 text-white">
        <DropdownMenuLabel className="cursor-default">
          Transaction
        </DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => replace(`${pathname}?create=saving`)}
          className="cursor-pointer"
        >
          <PiggyBank className="mr-2 h-4 w-4" />
          <span className="font-medium">Saving</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => replace(`${pathname}?create=receipt`)}
          className="cursor-pointer"
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          <span className="font-medium">Receipt</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => replace(`${pathname}?create=expense`)}
          className="cursor-pointer"
        >
          <ArrowUpFromLine className="mr-2 h-4 w-4" />
          <span className="font-medium">Expense</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
