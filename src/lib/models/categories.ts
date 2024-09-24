import { z } from 'zod'
import { capitalizeStr } from '@/lib/helpers'

// Schemas
export const CreateCategorySchema = z.object({
  id: z.string().optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .transform((val) => capitalizeStr(val)),
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
