'use client'

import { useCategoryStore } from '@/hooks/use-category'
import { useEffect } from 'react'

export function CategoryProvider({
  categories,
}: {
  categories: {
    id: string
    description: string
  }[]
}) {
  const setCategories = useCategoryStore((state) => state.setCategories)

  useEffect(() => {
    setCategories(categories)
  }, [categories, setCategories])

  return null
}
