'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ButtonFormSubmit } from '../common/Buttons'

export function NewCluster() {
  const [open, setOpen] = useState(false)

  const handleModal = (e: SyntheticEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onClick={handleModal} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          <span>New Cluster</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create cluster</AlertDialogTitle>
          <AlertDialogDescription>
            Set up a new cluster and invite collaborators to join.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action="" className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="clusterName">Cluster name</Label>
            <Input
              id="clusterName"
              name="clusterName"
              placeholder="Enter cluster name"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <ButtonFormSubmit title="Save" className="min-w-[61.38px]" />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
