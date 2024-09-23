'use server'

import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import {
  LoginFormState,
  LoginSchema,
  RegisterFormState,
  RegisterSchema,
} from '@/lib/models/authentication'
import { createUser, getUser } from '@/server/actions/users'
import { createPayloadAndTokenForUser } from '@/server/actions/session'
import { hashValue } from '@/lib/helpers'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await getUser({ email: parsed.data.email })
    if (!user) {
      return { errors: { email: ['E-mail not found'] } }
    }

    const matchPassword = await bcrypt.compare(
      parsed.data.password,
      user.password,
    )
    if (!matchPassword) {
      return { errors: { password: ['Password not match'] } }
    }

    await createPayloadAndTokenForUser(user)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/')
}

export async function register(
  formState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const validationResult = validateRegisterData(formData)
  if (!validationResult.success) {
    return { errors: validationResult.errors! }
  }

  const { name, email, password } = validationResult.data!

  const hash = await hashValue(password)

  try {
    const createdUser = await createUser(name, email, hash)

    await createPayloadAndTokenForUser(createdUser)
  } catch (err) {
    if (err instanceof Error && err.message.includes('Unique constraint')) {
      return { errors: { email: ['This e-mail address already registered'] } }
    } else {
      return { errors: { _form: 'Cannot connect to the server' } }
    }
  }

  redirect('/')
}

function validateRegisterData(formData: FormData) {
  const parsed = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  return { success: true, data: parsed.data }
}
