import { NextRequest, NextResponse } from 'next/server'

import { ROUTES_SIGNUP } from '@/constants'

import { getPathToRedirect, isAuthPages, isCheckoutPage } from '@/utils'

import { verifyAppHealth } from '@/functions'

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

  if (nextUrl.pathname !== '/' && !ROUTES_SIGNUP.includes(nextUrl.pathname)) {
    const appHealth = await verifyAppHealth(req)

    if (appHealth.maintenance) {
      const maintenanceUrl = new URL('/manutencao', nextUrl.origin)
      return NextResponse.redirect(maintenanceUrl)
    }
  }

  const { value: token } = cookies.get('token') ?? { value: null }
  const { value: checkoutInitiated } = cookies.get('checkout_initiated') ?? {
    value: null,
  }

  const hasVerifiedToken = token && (await verifyJwtToken(token))
  const isAuthPageRequested = isAuthPages(nextUrl.pathname)

  const homeUrl = new URL('/', nextUrl.origin)

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      return NextResponse.redirect(homeUrl)
    }

    if (isCheckoutPage(nextUrl.pathname) && !checkoutInitiated) {
      return NextResponse.redirect(homeUrl)
    }

    if (
      process.env.NEXT_PUBLIC_REACT_APP_STORE_ENABLED !== 'true' &&
      nextUrl.pathname === '/loja'
    ) {
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
    '/checkout/:path*',
    '/inventario/:path*',
    '/loja/:path*',
  ],
}
