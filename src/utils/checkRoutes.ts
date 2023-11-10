import { PRIVATE_ROUTES } from '@/constants'

export const isAuthPages = (url: string) => {
  if (url === '/') {
    return false
  }

  const urlSplitted = url.split('/')

  const isAuth = PRIVATE_ROUTES.some((page) => page === `/${urlSplitted[1]}`)
  return isAuth
}
