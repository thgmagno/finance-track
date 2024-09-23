import { z } from 'zod'

const convertStringToFloat = (val: string) => {
  const value = val
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  return parseFloat(value)
}

const convertStringToValidYear = (val?: string) => {
  const currentYear = new Date().getFullYear()
  if (!val) return currentYear
  const parsed = parseInt(val)
  if (!isNaN(parsed) && parsed >= 1970) {
    return parsed
  } else {
    return currentYear
  }
}

const convertStringToValidMonth = (val?: string) => {
  const currentMonth = new Date().getMonth() + 1
  if (!val) return currentMonth
  const parsed = parseInt(val)
  if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
    return parsed
  } else {
    return currentMonth
  }
}

// Schemas
export const CreateTransactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z
    .string()
    .min(7, 'Amount is required')
    .refine((val) => {
      const parsed = convertStringToFloat(val)
      return !isNaN(parsed)
    }, 'Invalid value for amount')
    .transform((val) => {
      return convertStringToFloat(val)
    }),
  year: z
    .string()
    .min(1, 'Year is required')
    .refine((val) => {
      const parsed = parseInt(val)
      return !isNaN(parsed) && parsed > 1970
    }, 'Invalid value for year')
    .transform((val) => {
      return parseInt(val)
    }),
  month: z
    .string()
    .min(1, 'Month is required')
    .refine((val) => {
      const parsed = parseInt(val)
      return !isNaN(parsed) && parsed > 0 && parsed <= 12
    }, 'Invalid value for month')
    .transform((val) => {
      return parseInt(val)
    }),
  categoryId: z.string().cuid(),
})

export const GetTransactionSchema = z.object({
  year: z
    .string()
    .optional()
    .transform((val) => {
      return convertStringToValidYear(val)
    }),
  month: z
    .string()
    .optional()
    .transform((val) => {
      return convertStringToValidMonth(val)
    }),
  categoryDescription: z.string().optional(),
})

// FormStates
export interface CreateTransactionFormState {
  errors: {
    description?: string[]
    amount?: string[]
    year?: string[]
    month?: string[]
    type?: string[]
    _form?: string
  }
}
