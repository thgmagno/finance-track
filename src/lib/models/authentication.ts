import { z } from 'zod'
import { capitalizeStr } from '@/lib/helpers'

// Schemas
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(30)
    .transform((val) => capitalizeStr(val)),
  email: z.string().max(40).email(),
  password: z.string().min(4),
})

// FormStates
export interface LoginFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface RegisterFormState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string
  }
}
