'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { MAINTENANCE_TIME_TO_CHECK_AGAIN } from '@/constants'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

import { appApi } from '@/modelsApi'

import { useShowErrorToast } from './useShowErrorToast'

export function useCheckMaintenance() {
  const { app, updateMaintenance } = useAppStore()
  const maintenance = app.maintenance

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const checkMaintenance = useCallback(async () => {
    const response = await appApi.healthCheck({ cache: 'no-cache' })

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.maintenance) {
      updateMaintenance(false)
      revalidatePath({ path: '/jogar' })
      return router.push('/jogar')
    }

    if (response.maintenance) {
      updateMaintenance(true)
      revalidatePath({ path: '/' })
    }
  }, [router, showErrorToast, updateMaintenance])

  useEffect(() => {
    if (!maintenance) {
      checkMaintenance()
      return
    }

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
  }, [maintenance, checkMaintenance, router])

  return null
}
