import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const CreateAccountSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
})
