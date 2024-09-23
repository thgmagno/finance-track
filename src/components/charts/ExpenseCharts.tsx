'use client'

import { useState } from 'react'
import { BarChart } from './BarChart'
import { PieChart } from './PieChart'
import { RadialChart } from './RadialChart'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ExpenseCharts() {
  const [index, setIndex] = useState<number>(1)

  const prevIndex = () => {
    if (index === 1) {
      setIndex(3)
    } else {
      setIndex((prev) => prev - 1)
    }
  }

  const nextIndex = () => {
    if (index === 3) {
      setIndex(1)
    } else {
      setIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={prevIndex} variant="ghost">
        <ChevronLeft />
      </Button>
      {index === 1 && <BarChart />}
      {index === 2 && <PieChart />}
      {index === 3 && <RadialChart />}
      <Button onClick={nextIndex} variant="ghost">
        <ChevronRight />
      </Button>
    </div>
  )
}
