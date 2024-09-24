import { z } from 'zod'

// Schemas
export const CreateClusterSchema = z.object({
  clusterName: z.string().min(1, 'Cluster name is required'),
})

// FormStates
export interface CreateClusterFormState {
  errors: {
    clusterName?: string[]
    _form?: string
  }
}
