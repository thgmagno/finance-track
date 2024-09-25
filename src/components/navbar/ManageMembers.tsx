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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, X } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

export function ManageMembers() {
  const [open, setOpen] = useState(false)

  const handleModal = (e: SyntheticEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onClick={handleModal} className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          <span>Members</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage members</AlertDialogTitle>
          <AlertDialogDescription>
            Manage members to align with your goals and enhance collaboration.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-3">
          <MemberSearchBar />
          <MembersList />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              'hover:text-white',
              buttonVariants({ variant: 'default' }),
            )}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function MemberSearchBar() {
  return (
    <div className="flex flex-col space-y-3">
      <form action="">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="email"
            name="email"
            placeholder="Search member by email"
            className="h-10"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </div>
      </form>
      <MemberSearchResult />
    </div>
  )
}

function MemberSearchResult() {
  return (
    <div className="flex items-center justify-between rounded-md border p-2">
      <Avatar className="mr-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="mr-2 flex w-full flex-col justify-center text-xs md:text-sm">
        <p>Jhon Doe</p>
        <p className="text-muted-foreground">jhon@m.com</p>
      </div>
      <Button variant="outline" size="sm">
        Invite
      </Button>
    </div>
  )
}

function MembersList() {
  return (
    <div>
      <span className="text-xs text-muted-foreground md:text-sm">Members:</span>
      <div className="grid grid-cols-5 gap-2 rounded-md border p-2 md:grid-cols-8">
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-fit">
            <div className="flex items-center justify-between">
              <div className="mr-2 flex w-full flex-col justify-center text-xs">
                <p>Jhon Doe</p>
                <p className="text-muted-foreground">jhon@m.com</p>
              </div>
              <Button
                variant="outline"
                className="h-8 w-10 rounded-full"
                size="icon"
                title="Take out"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
