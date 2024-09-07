'use server'

import { AuthSchema } from '@/lib/schemas/authSchema'
import { AuthFormState } from '@/lib/states/authState'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { getUserDetails } from './userActions'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export async function openSessionToken(
  token: string,
): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, secret)
  return payload
}

export async function createSessionToken(payload: {
  name: string
}): Promise<string> {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('1d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set(process.env.COOKIE_NAME as string, session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  })

  return session
}

export async function authenticate(
  formState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = AuthSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await getUserDetails({ email: parsed.data.email })

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

    const payload = { name: user.name }

    await createSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/')
}
