'use server'

import { RegisterSchema } from '@/lib/schemas/authentication'
import { RegisterFormState } from '@/lib/states/authentication'
import { createUser } from '@/actions/users'
import { createSessionToken } from './session'
import { redirect } from 'next/navigation'
import { hashValue } from '@/lib/helpers'

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
    const payload = {
      sub: createdUser.id,
      name: createdUser.name,
      cluster: '',
      clusterId: createdUser.clusterId,
    }
    await createSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
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
