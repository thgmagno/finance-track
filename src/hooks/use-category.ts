import { create } from 'zustand'

interface CategoryStore {
  categories: string[]
  setCategories: (categories: string[]) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}))
