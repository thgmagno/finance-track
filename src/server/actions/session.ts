'use server'

import { currentTimestamp, secret } from '@/lib/helpers'
import { Cluster, User } from '@prisma/client'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCluster } from './clusters'
import { getCache, setCacheWithTTL } from '../cache'

interface SessionPayload extends jose.JWTPayload {
  sub: string
  name: string
  cluster: string
  clusterId: string
  iat: number
}

export async function openSessionToken(
  token: string,
): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, secret)
  return payload as SessionPayload
}

export async function createSessionToken(
  payload: Omit<SessionPayload, 'iat'>,
): Promise<string> {
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt(currentTimestamp())
    .setExpirationTime('7d')
    .sign(secret)

  const { sub, exp } = await openSessionToken(session)

  cookies().set(String(process.env.COOKIE_NAME), session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
  })

  await storeSessionCache(String(sub), session)

  return session
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
  }

  createSessionToken(payload)
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
    name: String(user.name),
    cluster,
    clusterId: String(user.clusterId) ?? '',
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

  createSessionToken(payload)
}

export async function keepSessionUpdated() {
  const { sub, iat } = await getSession()

  const cacheJwt = await getCache({ type: 'session', id: sub })

  const { iat: timestampJwt } = await openSessionToken(String(cacheJwt))

  if (timestampJwt && timestampJwt > iat) {
    const url = new URL(
      String(process.env.BASE_URL).concat('api/refresh-token'),
    )
    url.searchParams.set('token', String(cacheJwt))
    redirect(url.toString())
  }
}

export async function storeSessionCache(userId: string, session: string) {
  await setCacheWithTTL({
    type: 'session',
    id: userId,
    data: session,
    ttl: 'oneDay',
  })
}
