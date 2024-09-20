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
import { Settings } from 'lucide-react'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ButtonFormSubmit } from '../common/Buttons'
import { getSession } from '@/actions/authentication/session'
import { DeleteClusterAlert } from './DeleteClusterAlert'

interface DataProps {
  username: string
  clusterName: string
}

export function ManageSettings() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<DataProps | null>(null)

  const handleModal = (e: SyntheticEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSession()
      res &&
        setData({
          username: String(res.name),
          clusterName: String(res.cluster),
        })
    }
    fetchData()
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onClick={handleModal} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage settings</AlertDialogTitle>
          <AlertDialogDescription>
            Set preferences that align with what you want.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action="" className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">My name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={data?.username}
              placeholder="Enter your name"
            />
          </div>
          {data?.clusterName && (
            <div className="flex items-end justify-between">
              <div className="flex w-full flex-col space-y-1.5">
                <Label htmlFor="clusterName">My cluster</Label>
                <Input
                  id="clusterName"
                  name="clusterName"
                  defaultValue={data.clusterName}
                  placeholder="Enter cluster name"
                />
              </div>
              <DeleteClusterAlert />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <ButtonFormSubmit title="Save" className="min-w-[61.38px]" />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
