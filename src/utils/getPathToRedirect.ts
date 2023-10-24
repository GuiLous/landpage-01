import { decodeJwt } from 'jose'

import { userAuthToken } from '@/middleware'

type verifyUser = {
  token: string
  urlOrigin: string
  isAuthPath?: boolean
  pathname: string
}

export const getPathToRedirect = ({
  token,
  urlOrigin,
  isAuthPath = false,
  pathname,
}: verifyUser): URL | undefined => {
  const userData = decodeJwt(token) as userAuthToken

  if (!userData.is_active && pathname !== '/conta-inativa')
    return new URL('/conta-inativa', urlOrigin)

  if (!userData.is_verified && pathname === '/alterar-email') return

  if (!userData.username && pathname !== '/cadastrar')
    return new URL('/cadastrar', urlOrigin)

  if (!userData.is_verified && userData.username && pathname !== '/verificar')
    return new URL('/verificar', urlOrigin)

  if (isAuthPath) {
    return
  }

  return new URL('/jogar', urlOrigin)
}
