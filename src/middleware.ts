// import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // const publicRoutes = ['/login']
  // const cookie = cookies().get(process.env.COOKIE_NAME!)?.value

  // if (!cookie && !publicRoutes.includes(request.url)) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // if (cookie && publicRoutes.includes(request.url)) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}

// export const config = {
//   matcher: ['/', '/dashboard/:path*', '/profile/:path*'],
// }
