'use client'

import { Category } from '@prisma/client'
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
import Link from 'next/link'
import { deleteCategory } from '@/server/actions/categories'
import { toast } from '@/hooks/use-toast'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href={{
                  query: { create: 'category', data: JSON.stringify(category) },
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit category</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(category.id)}
              className="cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete category</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

async function onDelete(id: string) {
  try {
    toast({
      description: (
        <span className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" /> Wait a minute...
        </span>
      ),
    })
    await deleteCategory(id)
  } finally {
    toast({
      description: (
        <span className="flex items-center">
          <Check className="mr-2 h-4 w-4" /> Delete successfully
        </span>
      ),
    })
  }
}
