'use client'

import { createCategory } from '@/actions/categories'
import { createTransaction } from '@/actions/transactions'
import { useFormState } from 'react-dom'

interface Props {
  categories: {
    description: string
    id: string
  }[]
}

export function CreateTransactions({ categories }: Props) {
  return (
    <div className="flex flex-col space-y-3">
      <CreatePaymentForm categories={categories} />
      <CreateCategoryForm />
    </div>
  )
}

function CreatePaymentForm({ categories }: Props) {
  const [formState, action] = useFormState(createTransaction, { errors: {} })

  return (
    <form action={action} className="mx-auto flex w-1/2 flex-col space-y-2">
      <h1>Payment</h1>

      <span className="text-xs font-medium">description</span>
      <input type="text" name="description" className="rounded-md border p-2" />

      <span className="text-xs font-medium">amount</span>
      <input type="text" name="amount" className="rounded-md border p-2" />

      <span className="text-xs font-medium">year</span>
      <input type="text" name="year" className="rounded-md border p-2" />

      <span className="text-xs font-medium">month</span>
      <input type="text" name="month" className="rounded-md border p-2" />

      <span className="text-xs font-medium">Category</span>
      <select name="categoryId" className="rounded-md border p-2">
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.description}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="rounded-md border bg-zinc-800 p-2 text-white"
      >
        Save
      </button>
    </form>
  )
}

function CreateCategoryForm() {
  const [formState, action] = useFormState(createCategory, { errors: {} })

  return (
    <form action={action} className="mx-auto flex w-1/2 flex-col space-y-2">
      <h1>Category</h1>

      <span className="text-xs font-medium">description</span>
      <input type="text" name="description" className="rounded-md border p-2" />

      <span className="text-xs font-medium">type</span>
      <select name="type" className="rounded-md border p-2">
        <option value="EXPENSE">Expense</option>
        <option value="RECEIPT">Receipt</option>
        <option value="SAVING">Saving</option>
      </select>

      <button
        type="submit"
        className="rounded-md border bg-zinc-800 p-2 text-white"
      >
        Save
      </button>
    </form>
  )
}
