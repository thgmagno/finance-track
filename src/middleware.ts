import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const publicRoutes = ['/authentication']
  const token = cookies().get(process.env.COOKIE_NAME!)?.value
  const pathname = request.nextUrl.pathname

  if (publicRoutes.includes(pathname)) {
    if (token) {
      try {
        const { exp } = (await jose.jwtVerify(token, secret)).payload
        if (exp && exp * 1000 > new Date().getTime()) {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch (error) {
        NextResponse.redirect(new URL('/api/logout', request.url))
      }
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/authentication', request.url))
  }

  try {
    const { exp } = (await jose.jwtVerify(token, secret)).payload
    if (exp && exp * 1000 < new Date().getTime()) {
      NextResponse.redirect(new URL('/api/logout', request.url))
    }
    return NextResponse.next()
  } catch (error) {
    NextResponse.redirect(new URL('/api/logout', request.url))
  }
}

export const config = {
  matcher: '/((?!static|_next/static|_next/image|favicon.ico).*)',
}
