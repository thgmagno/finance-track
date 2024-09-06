import * as jose from 'jose'
import { cookies } from 'next/headers'

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

async function createSessionToken(payload: { username: string }) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('1d')
    .sign(secret)
  const { exp } = await openSessionToken(session)

  cookies().set(process.env.COOKIE_NAME as string, session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })

  return session
}

export const AuthService = {
  openSessionToken,
  createSessionToken,
}
