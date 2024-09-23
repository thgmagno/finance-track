'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { DisplayFormStateError } from './DisplayFormStateError'

interface Props {
  errorMessage?: string | string[]
}

export function SelectMonth({ errorMessage }: Props) {
  const { months, currentMonth } = getMonths()

  return (
    <div className="grid flex-1 gap-2 text-base">
      <Label htmlFor="month">Month</Label>
      <Select name="month" defaultValue={currentMonth.toString()}>
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {months.map((month, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DisplayFormStateError message={errorMessage} />
    </div>
  )
}

function getMonths() {
  const currentMonth = new Date().getMonth() + 1
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return { months, currentMonth }
}
