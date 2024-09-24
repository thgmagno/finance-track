import { z } from 'zod'
import { capitalizeStr } from '@/lib/helpers'

// Schemas
export const CreateClusterSchema = z.object({
  clusterName: z
    .string()
    .min(1, 'Cluster name is required')
    .transform((val) => capitalizeStr(val)),
})

// FormStates
export interface CreateClusterFormState {
  errors: {
    clusterName?: string[]
    _form?: string
  }
}
