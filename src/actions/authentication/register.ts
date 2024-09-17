'use server'

import { createUser } from '@/actions/users'
import { redirect } from 'next/navigation'
import { hashValue } from '@/lib/helpers'
import { createPayloadAndTokenForUser } from './session'
import { RegisterFormState, RegisterSchema } from '@/lib/models/authentication'

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
