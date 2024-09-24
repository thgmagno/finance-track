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
import { useFormState } from 'react-dom'
import { DisplayFormStateError } from '@/components/common/DisplayFormStateError'
import { ButtonFormSubmit } from '@/components/common/Buttons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Method } from '@prisma/client'
import { upsertMethod } from '@/server/actions/methods'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'

interface FormProps extends React.ComponentProps<'form'> {
  data?: Method
}

export function DrawerMethod() {
  const [data, setData] = React.useState<Method | undefined>(undefined)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const open = searchParams.get('create') === 'method'
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
            <DialogTitle>{data ? 'Edit method' : 'Create method'}</DialogTitle>
            <DialogDescription>
              Manage your financial methods, such as payment or receipt types.
              Create new methods or edit existing ones to better organize and
              categorize your transactions.
            </DialogDescription>
          </DialogHeader>
          <MethodForm data={data} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={() => replace(pathname)}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{data ? 'Edit method' : 'Create method'}</DrawerTitle>
          <DrawerDescription>
            Manage your financial methods, such as payment or receipt types.
            Create new methods or edit existing ones to better organize and
            categorize your transactions.
          </DrawerDescription>
        </DrawerHeader>
        <MethodForm data={data} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function MethodForm({ className, data }: FormProps) {
  const [formState, action] = useFormState(upsertMethod, { errors: {} })

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
      <ButtonFormSubmit title={data ? 'Save changes' : 'Create method'} />
    </form>
  )
}

export function AddButton() {
  return (
    <div className="mb-3 flex justify-end">
      <Link href={{ query: { create: 'method' } }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="mr-2">
              <p>Add method</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  )
}
