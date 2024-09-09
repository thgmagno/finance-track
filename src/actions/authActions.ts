'use server'

import { AuthSchema, CreateAccountSchema } from '@/lib/schemas/authSchema'
import { AuthFormState, CreateAccountFormState } from '@/lib/states/authState'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { getUserDetails } from './userActions'
import { getClusterDetails } from './clusterActions'
import { prisma } from '@/lib/prisma'
import { capitalizeStr } from '@/utils/capitilizeStr'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET)

export async function openSessionToken(
  token: string,
): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, secret)
  return payload
}

export async function createSessionToken(payload: {
  sub: string
  name: string
  cluster?: string
  clusterId?: string | null
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

    const payload = {
      sub: String(user.id),
      name: user.name,
      cluster: '',
      clusterId: user.clusterId,
    }

    if (user.clusterId) {
      const cluster = await getClusterDetails(user.clusterId)
      payload.cluster = cluster?.name ?? ''
    }

    await createSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/')
}

export async function closeSession() {
  cookies().delete(process.env.COOKIE_NAME!)
}

export async function getSession() {
  const token = cookies().get(process.env.COOKIE_NAME!)?.value
  if (!token) redirect('/login')
  const { payload } = await jose.jwtVerify(token, secret)
  return payload
}

export async function refreshSessionToken(payload: {
  name?: string
  cluster?: string
  clusterId?: string
}) {
  let cluster = { id: '', name: '' }

  if (payload.clusterId) {
    const res = await getClusterDetails(payload.clusterId)
    if (res?.name && res.id) {
      cluster = { id: res.id, name: res.name }
    }
  }

  const oldPayload = await getSession()

  const newPayload = {
    sub: String(oldPayload.sub),
    name: payload.name ?? (oldPayload.name as string),
    cluster: cluster.name ?? oldPayload.cluster,
    clusterId: cluster.id ?? oldPayload.clusterId,
  }

  return createSessionToken(newPayload)
}

export async function createAccountAndSessionToken(
  formState: CreateAccountFormState,
  formData: FormData,
): Promise<CreateAccountFormState> {
  const parsed = CreateAccountSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const hash = await bcrypt.hash(parsed.data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: capitalizeStr(parsed.data.name),
        email: parsed.data.email,
        password: hash,
      },
    })

    const payload = {
      sub: String(user.id),
      name: user.name,
      cluster: '',
      clusterId: user.clusterId,
    }

    await createSessionToken(payload)
  } catch (err) {
    return {
      errors: { _form: 'Cannot connect to the server' },
    }
  }

  redirect('/')
}
