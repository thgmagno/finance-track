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
import { createTransaction } from '@/actions/transactions'
import { DisplayFormStateError } from '../common/DisplayFormStateError'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { SelectMonth } from '../common/SelectMonth'
import { getCategory } from '@/actions/categories'
import { ButtonFormSubmit } from '../common/Buttons'

type Categories = {
  id: string
  description: string
}[]

export function ExpenseForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const open = searchParams.get('create') === 'expense'
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [categories, setCategories] = React.useState<Categories>([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory('EXPENSE')
      categories && setCategories(categories)
    }

    fetchCategories()
  }, [])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={() => replace(pathname)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New expense</DialogTitle>
            <DialogDescription>
              Enter the expense amount, category, and description. Click save
              when finished.
            </DialogDescription>
          </DialogHeader>
          <Form categories={categories} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={() => replace(pathname)}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New expense</DrawerTitle>
          <DrawerDescription>
            Enter the expense amount, category, and description. Click save when
            finished.
          </DrawerDescription>
        </DrawerHeader>
        <Form categories={categories} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface FormProps extends React.ComponentProps<'form'> {
  categories: Categories
}

function Form({ categories, className }: FormProps) {
  const [formState, action] = useFormState(createTransaction, { errors: {} })

  const [amount, setAmount] = React.useState('R$ 0,00')
  const [year, setYear] = React.useState(new Date().getFullYear().toString())

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      },
    )
    return formattedValue
  }

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value)
    setAmount(formattedValue)
  }

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setYear(value)
  }

  return (
    <form action={action} className={cn('grid items-start gap-4', className)}>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="description" id="description" name="description" />
        <DisplayFormStateError message={formState?.errors.description} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          value={amount}
          onChange={handleChangeAmount}
        />
        <DisplayFormStateError message={formState?.errors.amount} />
      </div>
      <div className="flex space-x-4">
        <SelectMonth />
        <div className="grid flex-1 gap-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            value={year}
            onChange={handleChangeYear}
          />
          <DisplayFormStateError message={formState?.errors.year} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.description}
                  </SelectItem>
                ))
              ) : (
                <p className="flex items-center justify-center py-5 text-sm text-muted-foreground">
                  No results. Please make sure to create category{<br />}before
                  expenses.
                </p>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DisplayFormStateError message={formState?.errors.type} />
      </div>
      <ButtonFormSubmit title="Save changes" />
    </form>
  )
}
