import { z } from 'zod'

// Schemas
export const CreateCategorySchema = z.object({
  description: z.string().min(1, 'Description is required'),
  type: z
    .string()
    .min(1, 'Type is required')
    .refine((val) => ['EXPENSE', 'RECEIPT', 'SAVING'].includes(val), {
      message: 'Select a valid type',
    }),
})

// FormStates
export interface CreateCategoryFormState {
  errors: {
    description?: string[]
    type?: string[]
    _form?: string
  }
}
