'use client'

import { decodeJwt } from 'jose'
import Cookies from 'js-cookie'
import { useCallback } from 'react'

import { userAuthToken } from '@/middleware'

export function useAuth() {
  const getAuth = useCallback(() => {
    const token = Cookies.get('token')
    let userAuth: userAuthToken | null = null

    if (token) {
      userAuth = decodeJwt(token) as userAuthToken
    }

    return userAuth
  }, [])

  return getAuth
}
