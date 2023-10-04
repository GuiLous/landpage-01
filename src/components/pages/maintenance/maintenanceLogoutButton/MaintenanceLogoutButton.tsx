'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { MAINTENANCE_TIME_TO_CHECK_AGAIN } from '@/constants'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { addToast } from '@/store/slices/appSlice'

import { accountsApi, appApi } from '@/api'

import { Button, Link } from '@/components/shared'

export function MaintenanceLogoutButton() {
  const maintenance = useAppSelector((state) => state.app.maintenance)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [isFetching, setIsFetching] = useState(false)

  const handleLogout = useCallback(async () => {
    setIsFetching(true)
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
      setIsFetching(false)
      return
    }

    storageService.remove('token')
    router.push('/')
  }, [router, dispatch])

  const checkMaintenance = useCallback(async () => {
    const userToken = storageService.get('token')

    if (!userToken) return

    const response = await appApi.healthCheck(userToken)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )

      return
    }

    if (!response.maintenance) {
      storageService.set('maintenance', 'ended')
      router.push('/jogar')
    }
  }, [dispatch, router])

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
