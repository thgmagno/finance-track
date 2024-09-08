'use server'

import { AuthSchema } from '@/lib/schemas/authSchema'
import { AuthFormState } from '@/lib/states/authState'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { getUserDetails } from './userActions'
import { getClusterDetails } from './clusterActions'

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
  clusterId?: number | null
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
      clusterId: user.cluster_id,
    }

    if (user.cluster_id) {
      const cluster = await getClusterDetails(user.cluster_id)
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
  // revalidatePath('/')
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
  clusterId?: number
}) {
  let cluster = { id: 0, name: '' }

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
