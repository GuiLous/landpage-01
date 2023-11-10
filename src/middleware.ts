import { NextRequest, NextResponse } from 'next/server'

import { getPathToRedirect, isAuthPages } from '@/utils'

import { verifyJwtToken } from '@/services'

export type userAuthToken = {
  id: number
  email: string
  username: string | null
  is_active: boolean
  is_verified: boolean
  token: string
}

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req

  const { value: token } = cookies.get('token') ?? { value: null }

  const hasVerifiedToken = token && (await verifyJwtToken(token))
  const isAuthPageRequested = isAuthPages(nextUrl.pathname)

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const homeUrl = new URL('/', nextUrl.origin)

      return NextResponse.redirect(homeUrl)
    }

    const redirectUrl = getPathToRedirect({
      token,
      urlOrigin: nextUrl.origin,
      isAuthPath: true,
      pathname: nextUrl.pathname,
    })

    if (redirectUrl !== undefined) {
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  if (hasVerifiedToken) {
    const redirectUrl = getPathToRedirect({
      token,
      urlOrigin: nextUrl.origin,
      pathname: nextUrl.pathname,
    })

    if (redirectUrl !== undefined) {
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/manutencao/:path*',
    '/cadastrar/:path*',
    '/verificar/:path*',
    '/alterar-email/:path*',
    '/jogar/:path*',
    '/conta-inativa/:path*',
    '/conectar/:path*',
    '/perfil/:path*',
    '/conta/:path*',
  ],
}
