'use client'

import { useUrlState } from '@/hooks/use-url-state'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { ChevronsUpDown, Check } from 'lucide-react'
import { useState } from 'react'
import { useCategoryStore } from '@/hooks/use-category'

export function CategoryDropdown() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { categories } = useCategoryStore()
  const { setParam } = useUrlState()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" aria-expanded={open} className="p-0">
          {value
            ? categories.find((category) => category.id === value)?.description
            : 'Category'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? '' : currentValue
                    setValue(newValue)
                    setParam('category', newValue ? currentValue : null)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === category.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {category.description}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
