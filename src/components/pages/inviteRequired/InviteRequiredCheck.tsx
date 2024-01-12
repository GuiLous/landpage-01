'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { revalidatePath } from '@/utils'

import { appApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

export function InviteRequiredCheck() {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const checkRedirect = useCallback(() => {
    const tried_login = Cookies.get('tried_login')

    if (auth?.token || tried_login) return

    revalidatePath({ path: '/' })
    router.push('/')
  }, [auth?.token, router])

  const healthCheck = useCallback(async () => {
    const response = await appApi.healthCheck({ cache: 'no-cache' })

    if (response?.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.beta_required && !response.invite_required) {
      revalidatePath({ path: '/not-found' })
      router.push('/not-found')
    }
  }, [router, showErrorToast])

  useEffect(() => {
    healthCheck()

    checkRedirect()
  }, [healthCheck, checkRedirect])

  return null
}
