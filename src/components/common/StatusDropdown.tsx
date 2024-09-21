'use client'

import { useUrlState } from '@/hooks/use-url-state'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDown } from 'lucide-react'

export function StatusDropdown() {
  const { getParam, setParam } = useUrlState()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {['open', 'close', 'overdue'].map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            className="capitalize"
            checked={getParam('status') === status}
            onCheckedChange={(isChecked) => {
              setParam('status', isChecked ? status : null)
            }}
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
