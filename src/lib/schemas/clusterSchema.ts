import { z } from 'zod'

export const ClusterSchema = z.object({
  name: z.string().min(4),
  userId: z.preprocess(
    (val) => parseInt(val as string),
    z.number().positive().int(),
  ),
})
