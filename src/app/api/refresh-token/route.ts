'use server'

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  cookies().set(process.env.COOKIE_NAME as string, token as string, {
    path: '/',
    httpOnly: true,
  })

  return Response.redirect(new URL('/login', request.url))
}
