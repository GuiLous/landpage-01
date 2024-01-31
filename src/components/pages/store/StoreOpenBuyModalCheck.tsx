'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'

import { StoreItem } from '@/functions'

import { ModalBuyItem, ModalBuyItemConfirmation } from '@/components/shared'

interface StoreOpenBuyModalCheckProps {
  products: StoreItem[]
  featured: StoreItem[]
}

export function StoreOpenBuyModalCheck({
  featured,
  products,
}: StoreOpenBuyModalCheckProps) {
  const [openModalBuyItem, setOpenModalBuyItem] = useState(false)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [modalBuyItems, setModalBuyItems] = useState<StoreItem[]>([])
  const [itemToModal, setItemToModal] = useState<StoreItem | null>(null)
  const [itemPurchased, setItemPurchased] = useState<StoreItem | null>(null)

  const itemObject = Cookies.get('itemObject')
  const itemId = Cookies.get('itemId')
  const canOpenModal = Cookies.get('canOpenBuyModal')
  const checkoutCancelled = Cookies.get('checkout_cancelled')

  const handleOpenModalConfirmation = (item: StoreItem) => {
    setItemPurchased(item)
    setOpenModalConfirmation(true)
  }

  const getModalBuyItems = (item: StoreItem) => {
    const isBox = item?.object === 'box'
    const isCollection = item?.object === 'collection'

    let modalBuyItems: StoreItem[] = []

    modalBuyItems =
      (isBox || isCollection) && item?.items ? [...item.items] : []

    if (!isBox && !isCollection) {
      modalBuyItems = [item]
    }

    return modalBuyItems
  }

  const handleSearchItemByObjectAndId = useCallback(() => {
    let item = products.find(
      (item) => item.id === Number(itemId) && item.object === itemObject
    )

    if (!item) {
      item = featured.find(
        (item) => item.id === Number(itemId) && item.object === itemObject
      )
    }

    if (!item) return

    setModalBuyItems(getModalBuyItems(item))
    setItemToModal(item)
    setOpenModalBuyItem(true)
  }, [featured, itemId, itemObject, products])

  useEffect(() => {
    if (
      (canOpenModal || checkoutCancelled) &&
      itemObject &&
      itemId &&
      (products.length > 0 || featured.length > 0)
    ) {
      handleSearchItemByObjectAndId()
      Cookies.remove('itemObject')
      Cookies.remove('itemId')
      Cookies.remove('canOpenBuyModal')
      Cookies.remove('checkout_cancelled')
    }
  }, [
    itemObject,
    checkoutCancelled,
    canOpenModal,
    itemId,
    handleSearchItemByObjectAndId,
    products,
    featured,
  ])

  return (
    <>
      {!!itemPurchased && (
        <ModalBuyItemConfirmation
          foregroundImage={itemPurchased.foreground_image}
          backgroundImage={itemPurchased?.background_image}
          isCardOrProfile={
            itemPurchased.subtype === 'card' ||
            itemPurchased.subtype === 'profile'
          }
          open={openModalConfirmation}
          setOpen={setOpenModalConfirmation}
        />
      )}

      {!!itemToModal && modalBuyItems.length > 0 && openModalBuyItem && (
        <ModalBuyItem
          itemObject={itemToModal}
          items={modalBuyItems}
          open={openModalBuyItem}
          setOpen={setOpenModalBuyItem}
          handleOpenModalConfirmation={handleOpenModalConfirmation}
        />
      )}
    </>
  )
}
