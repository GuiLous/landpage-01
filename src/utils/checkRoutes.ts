import { PRIVATE_ROUTES } from '@/constants'

export const isAuthPages = (url: string) => {
  if (url === '/') {
    return false
  }

  return PRIVATE_ROUTES.some((page) => page.startsWith(url))
}
