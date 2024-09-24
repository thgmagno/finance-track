import { z } from 'zod'

// Schemas
export const CreateMethodSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
})

// FormStates
export interface CreateMethodFormState {
  errors: {
    description?: string[]
    _form?: string
  }
}
