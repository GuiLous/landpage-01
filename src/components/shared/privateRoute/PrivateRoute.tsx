'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { checkIsPublicRoute } from '@/functions'

import { httpService, storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { updateUser } from '@/store/slices/userSlice'

import { Loading } from '../loading'

interface PrivateRouteProps {
  children?: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const router = useRouter()
  const pathname = usePathname()

  const [isAuth, setIsAuth] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)

  const isPublicPage = checkIsPublicRoute(pathname)

  const verifyUserToRedirect = useCallback(() => {
    if (!user?.is_active) return router.push('/conta-inativa')
    if (!user?.account) return router.push('/cadastrar')
    if (!user?.account?.is_verified) return router.push('/verificar')
    if (user?.account && user.match_id !== null) return router.push('/conectar')

    return router.push('/jogar')
  }, [router, user])

  const redirectToPrivateRoutes = useCallback(
    (userToken: string | null) => {
      if (userToken) {
        verifyUserToRedirect()
      }
      setIsVerifying(false)
    },
    [verifyUserToRedirect]
  )

  const redirectToPublicRoutes = useCallback(
    (userToken: string | null) => {
      const isUserAuthenticated = !!userToken

      if (!isUserAuthenticated) return router.push('/')

      verifyUserToRedirect()

      setIsAuth(isUserAuthenticated)
      setIsVerifying(false)
    },
    [verifyUserToRedirect, router]
  )

  const initializeUserSlice = useCallback(
    async (userToken: string) => {
      const response = await httpService.get('accounts/auth/', userToken)

      dispatch(updateUser(response))
      setIsVerifying(false)
    },
    [dispatch]
  )

  useEffect(() => {
    const userToken = storageService.get('token')

    if (userToken && !user && pathname !== '/auth') {
      initializeUserSlice(userToken)
      return
    }

    if (!userToken && pathname === '/auth') return setIsVerifying(false)

    if (isPublicPage) return redirectToPrivateRoutes(userToken)

    redirectToPublicRoutes(userToken)
  }, [
    isPublicPage,
    redirectToPrivateRoutes,
    redirectToPublicRoutes,
    pathname,
    initializeUserSlice,
    user,
  ])

  return (
    <>
      {!isAuth && isPublicPage
        ? children
        : ((!isAuth && !isPublicPage) || isVerifying) && (
            <Loading.Overlay>
              <Loading.Gif />
            </Loading.Overlay>
          )}

      {isAuth && !isVerifying && children}
    </>
  )
}
