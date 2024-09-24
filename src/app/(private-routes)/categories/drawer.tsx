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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { DisplayFormStateError } from '@/components/common/DisplayFormStateError'
import { ButtonFormSubmit } from '@/components/common/Buttons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { upsertCategory } from '@/server/actions/categories'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'

interface FormProps extends React.ComponentProps<'form'> {
  data?: Category
}

export function DrawerCategory() {
  const [data, setData] = React.useState<Category | undefined>(undefined)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const open = searchParams.get('create') === 'category'
  const dataStr = searchParams.get('data')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  React.useEffect(() => {
    if (typeof dataStr === 'string') {
      setData(JSON.parse(decodeURI(dataStr)))
    }
  }, [dataStr])

  const handleClose = () => {
    setData(undefined)
    replace(pathname)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Specify the type, provide a brief description, and ensure all
              details are correct.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm data={data} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={() => replace(pathname)}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Specify the type, provide a brief description, and ensure all
            details are correct.
          </DrawerDescription>
        </DrawerHeader>
        <CategoryForm data={data} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function CategoryForm({ className, data }: FormProps) {
  const [formState, action] = useFormState(upsertCategory, { errors: {} })

  return (
    <form action={action} className={cn('grid items-start gap-4', className)}>
      <input type="hidden" name="id" value={data?.id ?? ''} />
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          type="description"
          id="description"
          name="description"
          defaultValue={data?.description ?? ''}
        />
        <DisplayFormStateError message={formState?.errors.description} />
      </div>
      <div className="grid flex-1 gap-2 text-base">
        <Label htmlFor="type">Category type</Label>
        <Select name="type" defaultValue={data?.type ?? ''}>
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
      <ButtonFormSubmit title={data ? 'Save change' : 'Create category'} />
    </form>
  )
}

export function AddButton() {
  return (
    <div className="mb-3 flex justify-end">
      <Link href={{ query: { create: 'category' } }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>Add category</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  )
}
