import { APP_ROUTES } from '@/constants'

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public)

  return appPublicRoutes.includes(asPath)
}

export const checkIfPathExists = (asPath: string) => {
  const pathSplitted = asPath.split('/')

  if (pathSplitted.includes('partidas') && pathSplitted.includes('conectar'))
    asPath = '/conectar'

  const appPublicRoutes = Object.values(APP_ROUTES.public)
  const appPrivateRoutes = Object.values(APP_ROUTES.private)

  return appPublicRoutes.includes(asPath) || appPrivateRoutes.includes(asPath)
}
