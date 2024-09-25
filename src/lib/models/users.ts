import { z } from 'zod'
import { capitalizeStr } from '@/lib/helpers'

// Schemas
export const UpdateInfoSchema = z.object({
  username: z
    .string()
    .min(1, 'User name is required')
    .transform((val) => capitalizeStr(val)),
  clusterName: z
    .string()
    .min(1, 'Cluster name is required')
    .transform((val) => capitalizeStr(val)),
})

// FormStates
export interface UpdateInfoFormState {
  success?: boolean
  errors: {
    username?: string[]
    clusterName?: string[]
    _form?: string
  }
}
