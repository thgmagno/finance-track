'use client'

import { Method } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Check, Edit, Loader, MoreHorizontal, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { deleteMethod } from '@/server/actions/methods'

export const columns: ColumnDef<Method>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const method = row.original
      const { replace } = useRouter()

      const handleUpdate = () => {
        const data = encodeURI(JSON.stringify(method))
        const uri = `?create=method&data=${data}`
        return replace(uri)
      }

      const handleDelete = async () => {
        try {
          toast({
            description: (
              <span className="flex items-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Wait a
                minute...
              </span>
            ),
          })
          await deleteMethod(method.id)
          toast({
            description: (
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Delete successfully
              </span>
            ),
          })
        } catch (e) {
          toast({
            title: 'An error occurred',
            description: 'Please try again later',
          })
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="float-end">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleUpdate} className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit method</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete method</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
