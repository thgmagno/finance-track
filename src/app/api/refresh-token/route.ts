'use server'

import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    cookies().set(process.env.COOKIE_NAME as string, token as string, {
      path: '/',
      httpOnly: true,
    })
  } catch (err) {
    return Response.redirect(new URL('/logout', request.url))
  }

  return Response.redirect(new URL('/login', request.url))
}
