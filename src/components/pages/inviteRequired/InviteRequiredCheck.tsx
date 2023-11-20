'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { appApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

export function InviteRequiredCheck() {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const checkRedirect = useCallback(() => {
    const tried_login = Cookies.get('tried_login')

    if (auth?.token || tried_login) return

    router.push('/')
  }, [auth, router])

  const healthCheck = useCallback(async () => {
    const response = await appApi.healthCheck()

    if (response?.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.beta_required) {
      router.push('/not-found')
    }
  }, [router, showErrorToast])

  useEffect(() => {
    healthCheck()

    checkRedirect()
  }, [healthCheck, checkRedirect])

  return null
}
