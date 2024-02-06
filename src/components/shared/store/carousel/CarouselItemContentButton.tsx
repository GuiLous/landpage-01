'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { Button, ModalBuyItem } from '@/components/shared'

interface CarouselItemContentButtonProps {
  item: StoreItem
  openModalBuyItem: boolean
  setOpenModalBuyItem: (state: boolean) => void
  handleOpenModalConfirmation: (item: StoreItem) => void
}

export function CarouselItemContentButton({
  item,
  openModalBuyItem,
  setOpenModalBuyItem,
  handleOpenModalConfirmation,
}: CarouselItemContentButtonProps) {
  const [modalBuyItems, setModalBuyItems] = useState<StoreItem[]>([])

  const handleOpenBuyModal = () => {
    getModalBuyItems(item)

    setOpenModalBuyItem(true)
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

    setModalBuyItems(modalBuyItems)
  }

  return (
    <>
      <Button.Root
        className={twMerge(
          'max-h-[42px] w-[180px]',
          '3xl:max-h-[38px]',
          'ultrawide:max-h-16 ultrawide:min-h-16 ultrawide:w-[280px]'
        )}
        onClick={handleOpenBuyModal}
      >
        <Button.Content className={twMerge('text-lg', '3xl:text-base')}>
          RC {item.price}
        </Button.Content>
      </Button.Root>

      {!!item && modalBuyItems.length > 0 && openModalBuyItem && (
        <ModalBuyItem
          itemObject={item}
          items={modalBuyItems}
          open={openModalBuyItem}
          setOpen={setOpenModalBuyItem}
          handleOpenModalConfirmation={handleOpenModalConfirmation}
        />
      )}
    </>
  )
}
