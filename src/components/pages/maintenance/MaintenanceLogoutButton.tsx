'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { MAINTENANCE_TIME_TO_CHECK_AGAIN } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import { accountsApi, appApi } from '@/modelsApi'

import { Button, Link } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function MaintenanceLogoutButton() {
  const maintenance = useAppSelector((state) => state.app.maintenance)

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(false)

  const handleLogout = useCallback(async () => {
    setIsFetching(true)

    if (!auth?.token) return

    const response = await accountsApi.logout(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    Cookies.remove('token')

    router.push('/')
  }, [router, showErrorToast, auth])

  const checkMaintenance = useCallback(async () => {
    if (!auth?.token) return

    const response = await appApi.healthCheck(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.maintenance) {
      storageService.set('maintenance', 'ended')
      router.push('/jogar')
    }
  }, [router, showErrorToast, auth])

  useEffect(() => {
    if (maintenance) {
      checkMaintenance()

      const interval = setInterval(
        checkMaintenance,
        MAINTENANCE_TIME_TO_CHECK_AGAIN
      )

      return () => {
        clearInterval(interval)
      }
    }
  }, [maintenance, checkMaintenance])

  return (
    <Button.Root asChild disabled={isFetching} onClick={handleLogout}>
      <Link href="/">
        {isFetching && <Button.Spinner />}

        <Button.Content
          isLoading={isFetching}
          disabled={isFetching}
          className="w-60 text-center text-sm font-bold"
          loadingText="Aguarde"
        >
          Voltar para o início
        </Button.Content>
      </Link>
    </Button.Root>
  )
}
