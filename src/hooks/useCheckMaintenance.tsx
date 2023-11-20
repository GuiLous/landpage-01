'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { MAINTENANCE_TIME_TO_CHECK_AGAIN } from '@/constants'

import { useAppDispatch, useAppSelector } from '@/store'
import { updateMaintenance } from '@/store/slices/appSlice'

import { appApi } from '@/modelsApi'

import { useShowErrorToast } from './useShowErrorToast'

export function useCheckMaintenance() {
  const maintenance = useAppSelector((state) => state.app.maintenance)
  const dispatch = useAppDispatch()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const checkMaintenance = useCallback(async () => {
    const response = await appApi.healthCheck({ cache: 'no-cache' })

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.maintenance) {
      dispatch(updateMaintenance(false))
      return router.push('/jogar')
    }

    if (response.maintenance) {
      dispatch(updateMaintenance(true))
    }
  }, [router, showErrorToast, dispatch])

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
