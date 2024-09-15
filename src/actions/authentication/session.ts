'use server'

import { secret } from '@/lib/helpers'
import * as jose from 'jose'
import { cookies } from 'next/headers'

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
}
