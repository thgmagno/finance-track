import { create } from 'zustand'

interface CategoryStore {
  categories: {
    id: string
    description: string
  }[]
  setCategories: (
    categories: {
      id: string
      description: string
    }[],
  ) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}))
