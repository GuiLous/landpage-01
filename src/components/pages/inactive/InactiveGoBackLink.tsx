'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'

import { accountsApi } from '@/modelsApi'

import { Link } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function InactiveGoBackLink() {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const handleLogout = useCallback(async () => {
    if (!auth?.token) return

    Cookies.remove('token')

    const response = await accountsApi.logout(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, auth])

  return (
    <div className="mt-4 flex-initial justify-center">
      <Link onClick={handleLogout} href="/" className="text-sm">
        Sair e voltar para página inicial
      </Link>
    </div>
  )
}
