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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ButtonFormSubmit } from '@/components/common/Buttons'
import { useFormState } from 'react-dom'
import { DisplayFormStateError } from '@/components/common/DisplayFormStateError'
import { createCluster } from '@/server/actions/clusters'

export function NewCluster() {
  const [formState, action] = useFormState(createCluster, { errors: {} })
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
        <form action={action} className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="clusterName">Cluster name</Label>
            <Input
              id="clusterName"
              name="clusterName"
              placeholder="Enter cluster name"
            />
            <DisplayFormStateError message={formState.errors?.clusterName} />
          </div>
          <DisplayFormStateError message={formState.errors?._form} />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <ButtonFormSubmit title="Save" className="min-w-[61.38px]" />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
