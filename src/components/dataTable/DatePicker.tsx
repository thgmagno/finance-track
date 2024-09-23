'use client'

import * as React from 'react'
import { Calendar as CalendarIcon, RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

export function DatePicker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const currentDate = new Date()

  const initialState = {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  }

  const selectedDate = {
    month: parseInt(String(searchParams.get('month'))) || initialState.month,
    year: parseInt(String(searchParams.get('year'))) || initialState.year,
  }

  const [month, setMonth] = React.useState(selectedDate.month)
  const [year, setYear] = React.useState(selectedDate.year)

  const formatDateStr = (val: string) =>
    new Date(val).toLocaleDateString('en-us', {
      month: 'long',
      year: '2-digit',
    })

  const handleSelectMonth = (selectedMonth: number) => {
    setMonth(selectedMonth)
  }

  const prevMonth = () => {
    if (month === 1) {
      setYear((prev) => prev - 1)
      setMonth(12)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear((prev) => prev + 1)
      setMonth(1)
    } else {
      setMonth((prev) => prev + 1)
    }
  }

  const handleChangeDate = () => {
    const params = new URLSearchParams(searchParams)

    if (month === initialState.month && year === initialState.year) {
      params.delete('month')
    } else {
      params.set('month', month.toString())
      params.set('year', year.toString())
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const resetDate = () => {
    setMonth(initialState.month)
    setYear(initialState.year)
    replace(pathname)
  }

  const isCurrentDate =
    selectedDate.month === initialState.month &&
    selectedDate.year === initialState.year

  return (
    <Popover>
      <div className="flex items-center">
        <PopoverTrigger asChild>
          <Button variant="link" className="ml-6 p-0 text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {month && year ? (
              <span className="min-w-28 text-start">
                {formatDateStr(`${selectedDate.year}-${selectedDate.month}-1`)}
              </span>
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </PopoverTrigger>
        {!isCurrentDate && (
          <Button
            onClick={resetDate}
            variant="link"
            className="p-0 text-muted-foreground"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            <span>Reset date</span>
          </Button>
        )}
      </div>
      <PopoverContent className="w-auto p-4">
        <div className="mb-2 flex items-center justify-between">
          <Button variant="outline" onClick={() => prevMonth()}>
            {'<'}
          </Button>
          <span className="mx-2 min-w-32 text-center">
            {formatDateStr(`${year}-${month}-1`)}
          </span>
          <Button variant="outline" onClick={() => nextMonth()}>
            {'>'}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(12)].map((_, index) => {
            const monthIndex = index + 1
            return (
              <Button
                key={monthIndex}
                variant="outline"
                onClick={() => handleSelectMonth(monthIndex)}
                className={clsx({
                  'bg-zinc-200 text-zinc-600':
                    monthIndex === initialState.month &&
                    year === initialState.year,
                  'bg-blue-500 text-white hover:bg-blue-600 hover:text-white':
                    month === monthIndex,
                })}
              >
                {new Date(year, monthIndex - 1).toLocaleString('en-us', {
                  month: 'long',
                })}
              </Button>
            )
          })}
        </div>
        <Button
          variant="outline"
          onClick={handleChangeDate}
          className="mt-2 w-full"
        >
          change
        </Button>
      </PopoverContent>
    </Popover>
  )
}
