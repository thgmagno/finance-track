import { z } from 'zod'

export const ClusterSchema = z.object({
  name: z.string().min(4),
  userId: z.string().cuid(),
})

export const FindClusterSchema = z.object({
  name: z.string().min(4),
})