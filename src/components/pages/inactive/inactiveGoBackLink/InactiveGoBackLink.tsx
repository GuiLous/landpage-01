'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { storageService } from '@/services'

import { accountsApi } from '@/api'

import { Link } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

export function InactiveGoBackLink() {
  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    const token = storageService.get('token')

    if (!token) return

    const response = await accountsApi.logout(token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    storageService.remove('token')
    router.push('/')
  }, [router, showErrorToast])

  return (
    <div className="mt-4 flex-initial justify-center">
      <Link onClick={handleLogout} href="/" className="text-sm">
        Sair e voltar para página inicial
      </Link>
    </div>
  )
}
