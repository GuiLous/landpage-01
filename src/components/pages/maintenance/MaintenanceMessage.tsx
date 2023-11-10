'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { MAINTENANCE_TIME_TO_CHECK_AGAIN } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import { appApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

export function MaintenanceMessage() {
  const maintenance = useAppSelector((state) => state.app.maintenance)

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const checkMaintenance = useCallback(async () => {
    if (!auth?.token) return

    const response = await appApi.healthCheck(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      return
    }

    if (!response.maintenance) {
      storageService.set('maintenance', 'ended')
      return router.push('/jogar')
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
    <p className="max-w-[600px] text-center">
      Calmô meu cria, a gente deu um pause pra ajustar umas coisas, mas já
      voltamos. Fica tranquilo que assim que terminar por aqui, a gente te
      libera no automático.
    </p>
  )
}
