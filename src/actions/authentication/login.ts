'use server'

import * as bcrypt from 'bcrypt'
import { getUser } from '../users'
import { redirect } from 'next/navigation'
import { createPayloadAndTokenForUser } from './session'
import { LoginFormState, LoginSchema } from '@/lib/models/authentication'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const validationResult = validateLoginData(formData)
  if (!validationResult.success) {
    return { errors: validationResult.errors! }
  }

  const { email, password } = validationResult.data!

  try {
    const authResult = await authenticateUser(email, password)
    if (!authResult.success) {
      return { errors: authResult.errors! }
    }

    await createPayloadAndTokenForUser(authResult.user)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/')
}

function validateLoginData(formData: FormData) {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  return { success: true, data: parsed.data }
}

async function authenticateUser(email: string, password: string) {
  const user = await getUser({ email })
  if (!user) {
    return { success: false, errors: { email: ['E-mail not found'] } }
  }

  const matchPassword = await bcrypt.compare(password, user.password)
  if (!matchPassword) {
    return { success: false, errors: { password: ['Password not match'] } }
  }

  return { success: true, user }
}
