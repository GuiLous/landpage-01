'use client'

import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { storeApi } from '@/modelsApi'

import { SkeletonModalReloadCoinsListCards } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import { ModalReloadCoinsCard } from './ModalReloadCoinsCard'
import { ModalReloadCoinsCardAmount } from './ModalReloadCoinsCardAmount'
import { ModalReloadCoinsCardBorder } from './ModalReloadCoinsCardBorder'
import { ModalReloadCoinsCardGradient } from './ModalReloadCoinsCardGradient'
import { ModalReloadCoinsCardImage } from './ModalReloadCoinsCardImage'
import { ModalReloadCoinsCardPrice } from './ModalReloadCoinsCardPrice'

interface ModalReloadCoinsListCardsProps {
  open: boolean
}

type ReloadCoin = {
  id: string
  name: string
  price: string
  amount: number
}

export function ModalReloadCoinsListCards({
  open,
}: ModalReloadCoinsListCardsProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [isFetching, setIsFetching] = useState(true)
  const [reloadCoins, setReloadCoins] = useState<ReloadCoin[]>([])

  const getReloadCoins = useCallback(async () => {
    if (!auth?.token) return

    setIsFetching(true)

    const response = await storeApi.listProducts(auth.token, {
      cache: 'force-cache',
    })

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    setReloadCoins(response)
    setIsFetching(false)
  }, [showErrorToast, auth?.token])

  useEffect(() => {
    if (open) {
      getReloadCoins()
    }
  }, [getReloadCoins, open])

  return (
    <>
      {isFetching && <SkeletonModalReloadCoinsListCards />}

      {!isFetching && (
        <div
          className={twMerge(
            'gap-5 grid max-w-[1068px] grid-cols-3',
            '3xl:gap-3.5 3xl:max-w-[768px]'
          )}
        >
          {reloadCoins.map((coin) => (
            <ModalReloadCoinsCard
              key={coin.id}
              id={coin.id}
              setIsFetching={setIsFetching}
            >
              <ModalReloadCoinsCardImage />
              <ModalReloadCoinsCardAmount amount={coin.amount} />
              <ModalReloadCoinsCardPrice price={coin.price} />
              <ModalReloadCoinsCardBorder />
              <ModalReloadCoinsCardGradient />
            </ModalReloadCoinsCard>
          ))}
        </div>
      )}
    </>
  )
}
