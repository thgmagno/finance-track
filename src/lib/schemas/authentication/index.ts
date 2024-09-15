import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
})
