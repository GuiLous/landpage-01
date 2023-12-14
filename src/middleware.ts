import { NextRequest, NextResponse } from 'next/server'

import { getPathToRedirect, isAuthPages } from '@/utils'

import { verifyAppHealth } from '@/functions'

import { verifyJwtToken } from '@/services'

import { ROUTES_SIGNUP } from './constants'

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

  if (nextUrl.pathname !== '/' && !ROUTES_SIGNUP.includes(nextUrl.pathname)) {
    const appHealth = await verifyAppHealth()

    if (appHealth.maintenance) {
      const maintenanceUrl = new URL('/manutencao', nextUrl.origin)
      return NextResponse.redirect(maintenanceUrl)
    }
  }

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
    '/cadastrar/:path*',
    '/verificar/:path*',
    '/alterar-email/:path*',
    '/jogar/:path*',
    '/conta-inativa/:path*',
    '/conectar/:path*',
    '/perfil/:path*',
    '/conta/:path*',
    '/inventario/:path*',
  ],
}
