'use client'

import { SignJWT } from 'jose'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { revalidatePath } from '@/utils'

import { getJwtSecretKey, httpService } from '@/services'

import { useAuth } from '@/hooks'

export function InactiveCheckIfIsActive() {
  const auth = useAuth()

  const router = useRouter()

  const checkIfUserIsAtive = useCallback(async () => {
    if (!auth?.token) return

    const response = await httpService.get('accounts/auth/', auth.token, {
      cache: 'no-cache',
    })

    if (response.is_active) {
      const jwtToken = await new SignJWT({
        id: response.id,
        email: response.email,
        username: response?.account?.username || null,
        is_active: response.is_active,
        is_verified: response?.account?.is_verified || false,
        token: auth?.token,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getJwtSecretKey())

      Cookies.set('token', jwtToken, { path: '/' })

      revalidatePath({ path: '/' })

      return router.push('/')
    }
  }, [auth?.token, router])

  useEffect(() => {
    if (!auth?.is_active) {
      checkIfUserIsAtive()
    }
  }, [auth?.is_active, checkIfUserIsAtive])

  return null
}
