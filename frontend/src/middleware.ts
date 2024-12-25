import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import fetcher from './helpers/fetcher'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const verify =
    (
      await fetcher({
        method: 'GET',
        endpoint: 'auth/verify',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).statusCode === 200

  const { pathname } = request.nextUrl
  if (!verify && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (verify) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
}
