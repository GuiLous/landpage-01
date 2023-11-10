import { PRIVATE_ROUTES } from '@/constants'

export const isAuthPages = (url: string) => {
  if (url === '/') {
    return false
  }

  const isAuth = PRIVATE_ROUTES.some((page) => url.startsWith(page))
  return isAuth
}
