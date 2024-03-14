'use server'

import { decodeJwt } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { userAuthToken } from '@/middleware'

export const getAuthServer = async () => {
  const cookieStore = cookies()

  const { value: token } = cookieStore.get('token') ?? { value: null }
  let userAuth: userAuthToken | null = null

  if (!token) return redirect('/')

  userAuth = decodeJwt(token) as userAuthToken

  return userAuth
}
