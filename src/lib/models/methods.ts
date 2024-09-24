import { z } from 'zod'
import { capitalizeStr } from '@/lib/helpers'

// Schemas
export const CreateMethodSchema = z.object({
  id: z.string().optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .transform((val) => capitalizeStr(val)),
})

// FormStates
export interface CreateMethodFormState {
  errors: {
    description?: string[]
    _form?: string
  }
}
