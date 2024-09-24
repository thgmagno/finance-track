import { z } from 'zod'

// Schemas
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
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
