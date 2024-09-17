'use server'

import { secret } from '@/lib/helpers'
import { Cluster, User } from '@prisma/client'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCluster } from '../clusters'

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

export async function endSession() {
  cookies().delete(process.env.COOKIE_NAME!)
  redirect('/login')
}

export async function getSession() {
  const token = cookies().get(process.env.COOKIE_NAME!)?.value
  if (!token) redirect('/login')
  const { payload } = await jose.jwtVerify(token, secret)
  return payload
}

export async function updateSession({
  user,
  cluster,
}: {
  user?: User
  cluster?: Cluster
}) {
  const { sub, name, cluster: oldCluster, clusterId } = await getSession()

  const payload = {
    sub: user?.id ?? sub,
    name: user?.name ?? name,
    cluster: cluster?.name ?? oldCluster,
    clusterId: cluster?.id ?? clusterId,
  }

  return createSessionToken(
    payload as {
      sub: string
      name: string
      cluster?: string
      clusterId?: string | null
    },
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPayloadAndTokenForUser(user: any) {
  const cluster = user.clusterId
    ? await getCluster({ id: user.clusterId }).then(
        (clusters) => clusters[0].name,
      )
    : ''

  const payload = {
    sub: String(user.id),
    name: user.name,
    cluster,
    clusterId: user.clusterId ?? '',
  }

  return createSessionToken(payload)
}
