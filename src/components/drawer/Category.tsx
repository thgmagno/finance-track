'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { DisplayFormStateError } from '../common/DisplayFormStateError'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createCategory } from '@/actions/categories'
import { ButtonFormSubmit } from '../common/Buttons'

export function CategoryForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const open = searchParams.get('create') === 'category'
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={() => replace(pathname)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New category</DialogTitle>
            <DialogDescription>
              Specify the type, provide a brief description, and ensure all
              details are correct.
            </DialogDescription>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={() => replace(pathname)}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New category</DrawerTitle>
          <DrawerDescription>
            Specify the type, provide a brief description, and ensure all
            details are correct.
          </DrawerDescription>
        </DrawerHeader>
        <Form className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface FormProps extends React.ComponentProps<'form'> {}

function Form({ className }: FormProps) {
  const [formState, action] = useFormState(createCategory, { errors: {} })

  return (
    <form action={action} className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="description" id="description" name="description" />
        <DisplayFormStateError message={formState?.errors.description} />
      </div>
      <div className="grid flex-1 gap-2 text-base">
        <Label htmlFor="type">Category type</Label>
        <Select name="type">
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select category type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="RECEIPT">Receipt</SelectItem>
              <SelectItem value="SAVING">Saving</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DisplayFormStateError message={formState?.errors.type} />
      </div>
      <ButtonFormSubmit title="Create category" />
    </form>
  )
}
