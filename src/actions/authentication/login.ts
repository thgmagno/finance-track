'use server'

import * as bcrypt from 'bcrypt'
import { getUser } from '../users'
import { redirect } from 'next/navigation'
import { LoginSchema } from '@/lib/schemas/authentication'
import { LoginFormState } from '@/lib/states/authentication'
import { createSessionToken } from './session'

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

    await createTokenForUser(authResult.user)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createTokenForUser(user: any) {
  const payload = {
    sub: String(user.id),
    name: user.name,
    cluster: '',
    clusterId: user.clusterId,
  }

  return createSessionToken(payload)
}
