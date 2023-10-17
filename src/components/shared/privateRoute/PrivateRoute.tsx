'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { checkIfPathExists, checkIsPublicRoute } from '@/functions'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { addToast, updateMaintenance } from '@/store/slices/appSlice'

import { appApi } from '@/api'

import { Loading } from '@/components/shared'

import { useInitializeReducers, useShowErrorToast } from '@/hooks'

interface PrivateRouteProps {
  children?: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.user)
  const { match } = useAppSelector((state) => state.match)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const showErrorToast = useShowErrorToast()
  const { initializeReducers, isLoading } = useInitializeReducers()

  const [isAuth, setIsAuth] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)

  const isPublicPage = checkIsPublicRoute(pathname)
  const pathExists = checkIfPathExists(pathname)

  const checkMaintenance = useCallback(
    async (userToken: string) => {
      if (!userToken) return

      const response = await appApi.healthCheck(userToken)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        return
      }

      dispatch(updateMaintenance(response.maintenance))
    },
    [dispatch, showErrorToast]
  )

  // Redirect user to correct page
  const verifyUserToRedirect = useCallback(() => {
    if (!user?.account?.is_verified && pathname === '/alterar-email') return

    if (!user?.is_active) return router.push('/conta-inativa')
    if (!user?.account) return router.push('/cadastrar')
    if (!user?.account?.is_verified) return router.push('/verificar')

    return router.push('/jogar')
  }, [router, user, pathname])

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

  // Redirect user to correct page
  useEffect(() => {
    if (pathname === '/not-found') {
      return
    }

    if (!pathExists) return router.push('/not-found')

    const userToken = storageService.get('token')

    if (userToken && !user && pathname !== '/auth') {
      initializeReducers(userToken)
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
    initializeReducers,
    user,
    router,
    pathExists,
  ])

  // Remove matchConnectTimer from storage
  useEffect(() => {
    if (match) {
      const connectPagePath = `/partidas/${match.id}/conectar`
      if (match && pathname !== connectPagePath) {
        storageService.remove('matchConnectTimer')
      }
    }
  }, [match, pathname])

  // check maintenance
  useEffect(() => {
    const userToken = storageService.get('token')

    user && userToken && checkMaintenance(userToken)
  }, [user, checkMaintenance])

  useEffect(() => {
    const maintenance = storageService.get('maintenance')
    if (maintenance && maintenance === 'ended') {
      storageService.remove('maintenance')
      dispatch(
        addToast({
          title: 'A manutenção foi finalizada',
          content:
            'Filas e convites de lobby estão habilitados novamente. GLHF!',
          variant: 'warning',
        })
      )
    }
  }, [dispatch])

  return (
    <>
      {!isAuth && isPublicPage
        ? children
        : ((!isAuth && !isPublicPage) || isVerifying || isLoading) && (
            <Loading.Overlay>
              <Loading.Gif />
            </Loading.Overlay>
          )}

      {isAuth && !isVerifying && !isLoading && children}
    </>
  )
}
