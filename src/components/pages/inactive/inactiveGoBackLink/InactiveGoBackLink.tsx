'use client'

import { accountsApi } from '@/api'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'

import { Link } from '@/components/shared'

export function InactiveGoBackLink() {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleLogout = useCallback(async () => {
    const token = storageService.get('token')

    if (!token) return

    const response = await accountsApi.logout(token)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return
    }

    storageService.remove('token')
    router.push('/')
  }, [dispatch, router])

  return (
    <div className="mt-4 flex-initial justify-center">
      <Link onClick={handleLogout} href="/" className="text-sm">
        Sair e voltar para página inicial
      </Link>
    </div>
  )
}
