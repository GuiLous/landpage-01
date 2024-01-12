'use client'

import Cookies from 'js-cookie'
import { ReactNode, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { storeApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

interface ModalReloadCoinsCardProps {
  id: string
  children: ReactNode
  setIsFetching: (state: boolean) => void
}

export function ModalReloadCoinsCard({
  id,
  children,
  setIsFetching,
}: ModalReloadCoinsCardProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const handlePurchaseCredit = useCallback(
    async (productId: string) => {
      if (!auth?.token) return
      setIsFetching(true)

      const response = await storeApi.buyProduct(auth.token, {
        product_id: productId,
      })

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setIsFetching(false)
        return
      }

      Cookies.set('checkout_initiated', 'true')
      window.location.replace(response.url)
    },
    [auth?.token, showErrorToast, setIsFetching]
  )

  return (
    <div
      className={twMerge(
        'flex-col items-center gap-10 bg-gray-1100 rounded-lg cursor-pointer min-w-[344px] overflow-hidden pt-10 px-10 relative',
        '3xl:gap-6 3xl:min-w-[246px] 3xl:pt-6 3xl:px-6',
        'group'
      )}
      onClick={() => handlePurchaseCredit(id)}
    >
      {children}
    </div>
  )
}
