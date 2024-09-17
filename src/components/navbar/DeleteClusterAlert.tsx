'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function DeleteClusterAlert() {
  const confirmationPrompt = 'delete this cluster'

  const [open, setOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')

  const handleOpenAlertDialog = (e: SyntheticEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleDeleteCluster = (e: SyntheticEvent) => {
    e.preventDefault()
    if (confirmation !== confirmationPrompt) return null
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          onClick={handleOpenAlertDialog}
          className="ml-2 h-12 hover:bg-red-500 hover:text-zinc-100"
          variant="outline"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete cluster?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This cluster will be deleted, along with all of Transactions, Data,
            Participants, and Settings.
            <p className="mt-3 rounded-md bg-red-200 p-2 text-red-600 ring-2 ring-red-500">
              Warning: This action is not reversible. Please be certain.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="actionConfirm" className="select-none">
            To verify, type "delete this cluster" below:
          </Label>
          <Input
            id="actionConfirm"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCluster}
            className="select-none bg-red-600 hover:bg-red-700 disabled:bg-zinc-500"
            disabled={confirmation !== confirmationPrompt}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
