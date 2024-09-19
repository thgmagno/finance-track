'use server'

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  cookies().set(process.env.COOKIE_NAME!, '', { maxAge: 0 })

  return Response.redirect(new URL('/login', request.url))
}
