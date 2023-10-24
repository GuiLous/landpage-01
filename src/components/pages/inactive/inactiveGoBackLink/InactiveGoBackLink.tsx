'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { accountsApi } from '@/api'

import { Link } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function InactiveGoBackLink() {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    if (!auth?.token) return

    const response = await accountsApi.logout(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    Cookies.remove('token')

    router.push('/')
  }, [router, showErrorToast, auth])

  return (
    <div className="mt-4 flex-initial justify-center">
      <Link onClick={handleLogout} href="/" className="text-sm">
        Sair e voltar para página inicial
      </Link>
    </div>
  )
}
