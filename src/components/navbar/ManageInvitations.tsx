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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Loader2, UserPlus } from 'lucide-react'
import { SyntheticEvent, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { fetchUsersByEmailExcludingCurrentUser } from '@/actions/users'
import { Button } from '../ui/button'

interface FindUser {
  name: string
  email: string
}

export function ManageInvitations() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [findUser, setFindUser] = useState<FindUser | string>('')

  const handleModal = (e: SyntheticEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!search && inputRef.current) {
      inputRef.current.focus()
      setTimeout(() => {
        inputRef.current?.blur()
      }, 150)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return
    }
    setFindUser('')
    setLoading(true)
    const user = await fetchUsersByEmailExcludingCurrentUser(search)
    setLoading(false)
    setFindUser(user || 'No users found')
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onClick={handleModal} className="cursor-pointer">
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Invite users</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invite users</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the e-mail addresses of the people you want to invite.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="E-mail addresses"
        />
        {loading && (
          <div className="flex h-10 items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        )}
        {findUser && typeof findUser === 'object' && (
          <div className="flex items-center justify-between rounded-md border p-2">
            <p className="flex flex-col">
              <span className="text-sm">{findUser.name}</span>
              <span className="text-xs">{findUser.email}</span>
            </p>
            <Button size="sm" variant="outline">
              Send invite
            </Button>
          </div>
        )}
        {findUser && typeof findUser === 'string' && (
          <p className="text-center font-medium text-muted-foreground">
            {findUser}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSearch}>
            Search users
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
