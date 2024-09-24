'use server'

import { currentTimestamp, secret } from '@/lib/helpers'
import { Cluster, User } from '@prisma/client'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/server/db'
import { getCluster } from './clusters'

interface SessionPayload extends jose.JWTPayload {
  name: string
  cluster: string
  clusterId: string
  createdAt: number
  sub: string
}

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
  createdAt: number
}): Promise<string> {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('7d')
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
  redirect('/authentication')
}

export async function getSession() {
  const token = cookies().get(process.env.COOKIE_NAME!)?.value
  if (!token) redirect('/authentication')
  const { payload } = await jose.jwtVerify(token, secret)
  return payload as SessionPayload
}

export async function updateSessionAndStoreToken({
  user,
  cluster,
}: {
  user?: User
  cluster?: Cluster
}) {
  const { sub, name, cluster: oldCluster, clusterId } = await getSession()

  const payload = {
    sub: user?.id ?? String(sub),
    name: user?.name ?? String(name),
    cluster: cluster?.name ?? String(oldCluster),
    clusterId: cluster?.id ?? String(clusterId),
    createdAt: currentTimestamp(),
  }

  await Promise.all([createSessionToken(payload), storeSessionToken(payload)])
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
    createdAt: currentTimestamp(),
  }

  return createSessionToken(payload)
}

export async function removeClusterFromSessionAndStoreToken(
  sub: string,
  name: string,
) {
  const payload = {
    sub,
    name,
    cluster: '',
    clusterId: '',
    createdAt: currentTimestamp(),
  }

  await Promise.all([createSessionToken(payload), storeSessionToken(payload)])
}

async function storeSessionToken(payload: {
  sub: string
  name: string
  cluster?: string
  clusterId?: string | null
  createdAt: number
}) {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('7d')
    .sign(secret)

  const { sub } = await openSessionToken(session)

  return db.session.upsert({
    where: { userId: sub },
    update: { token: session, timestamp: currentTimestamp() },
    create: {
      userId: String(sub),
      token: session,
      timestamp: currentTimestamp(),
    },
  })
}

export async function keepSessionUpdated() {
  const tolerance = 10
  const { sub, createdAt } = await getSession()

  const responseDB = await db.session.findUnique({
    where: {
      userId: sub,
      timestamp: { gt: parseInt(String(createdAt)) + tolerance },
    },
  })

  if (responseDB) {
    const url = new URL(process.env.BASE_URL!.concat('api/refresh-token'))
    url.searchParams.set('token', responseDB.token)
    redirect(url.toString())
  }
}
