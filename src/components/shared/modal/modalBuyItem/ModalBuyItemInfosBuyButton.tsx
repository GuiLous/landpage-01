'use client'

import Cookies from 'js-cookie'
import { MouseEvent, useCallback, useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { useUserStore } from '@/store/userStore'

import { storeApi } from '@/modelsApi'

import { Button, ModalReloadCoins, ReloadCoinsIcon } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface ModalBuyItemInfosBuyButtonProps {
  purchased?: boolean
  price: number
  itemObject: StoreItem
  handleCloseModal: () => void
  handleOpenModalConfirmation: (item: StoreItem) => void
}

const buttonIcons = {
  default: { icon: MdOutlineShoppingBag },
  insufficient: { icon: ReloadCoinsIcon },
  purchased: { icon: BsCheckCircleFill },
}

export function ModalBuyItemInfosBuyButton({
  purchased = false,
  price = 0,
  itemObject,
  handleCloseModal,
  handleOpenModalConfirmation,
}: ModalBuyItemInfosBuyButtonProps) {
  const { user, updateUser } = useUserStore()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [isFetching, setIsFetching] = useState(false)
  const [openModalReloadCoin, setOpenModalReloadCoin] = useState(false)

  const coins = user?.account?.coins || 0

  const insufficientCoins = coins < price

  const getIconKey = useCallback(() => {
    if (insufficientCoins) return 'insufficient'
    if (purchased) return 'purchased'
    return 'default'
  }, [insufficientCoins, purchased])

  const handleOpenModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      Cookies.set('itemObject', itemObject.object)
      Cookies.set('itemId', String(itemObject.id))

      setOpenModalReloadCoin(true)
    },
    [itemObject]
  )

  const handleBuy = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (!auth?.token || purchased || insufficientCoins) return

      setIsFetching(true)

      let response

      if (itemObject.object === 'item') {
        response = await storeApi.buyItem(auth.token, itemObject.id)
      }

      if (itemObject.object === 'box') {
        response = await storeApi.buyBox(auth.token, itemObject.id)
      }

      if (itemObject.object === 'collection') {
        response = await storeApi.buyCollection(auth.token, itemObject.id)
      }

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setIsFetching(false)
        return
      }

      if (user && user?.account?.coins) {
        updateUser({
          ...user,
          account: {
            ...user.account,
            coins: user.account.coins - price,
          },
        })
      }

      setIsFetching(false)
      handleOpenModalConfirmation(itemObject)
      handleCloseModal()
    },
    [
      auth?.token,
      purchased,
      insufficientCoins,
      itemObject,
      user,
      handleOpenModalConfirmation,
      handleCloseModal,
      showErrorToast,
      updateUser,
      price,
    ]
  )

  return (
    <>
      <Button.Root
        className={twMerge('min-h-12', '3xl:min-h-[42px]')}
        light={purchased}
        disabled={purchased || isFetching}
        onClick={insufficientCoins ? handleOpenModal : handleBuy}
      >
        {isFetching && <Button.Spinner />}

        <Button.Icon
          icon={buttonIcons[getIconKey()].icon}
          className={twMerge(
            'text-xl 3xl:text-lg',
            (purchased || insufficientCoins) && 'text-[1.375rem] 3xl:text-xl'
          )}
        />

        <Button.Content
          className={twMerge('text-sm font-semibold', '3xl:text-xs')}
          loadingText={insufficientCoins ? 'Comprando RC' : 'Comprando'}
          isLoading={isFetching}
        >
          {purchased && 'Item adquirido'}
          {!purchased && insufficientCoins && 'Comprar RC'}
          {!insufficientCoins && !purchased && 'Comprar'}
        </Button.Content>
      </Button.Root>

      <ModalReloadCoins
        open={openModalReloadCoin}
        setOpen={setOpenModalReloadCoin}
      />
    </>
  )
}
