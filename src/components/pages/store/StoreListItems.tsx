'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import {
  ModalBuyItem,
  ModalBuyItemConfirmation,
  StoreItemCard,
} from '@/components/shared'

interface StoreListItemsProps {
  products: StoreItem[]
  placeholdersProducts: string[]
}

export function StoreListItems({
  products,
  placeholdersProducts,
}: StoreListItemsProps) {
  const [openModalBuyItem, setOpenModalBuyItem] = useState(false)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [modalBuyItems, setModalBuyItems] = useState<StoreItem[]>([])
  const [itemObject, setItemObject] = useState<StoreItem | null>(null)
  const [itemPurchased, setItemPurchased] = useState<StoreItem | null>(null)

  const handleOpenModalConfirmation = (item: StoreItem) => {
    setItemPurchased(item)
    setOpenModalConfirmation(true)
  }

  const handleOpenBuyModal = ({
    item,
    purchased = false,
  }: {
    item: StoreItem
    purchased?: boolean
  }) => {
    if (purchased) return

    setItemObject(item)
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
    <section
      className={twMerge(
        'grid grid-cols-4 gap-6 gap-y-10',
        'store-md:grid-cols-store-md',
        'store-sm:grid-cols-store-sm'
      )}
    >
      {products.map((item, index) => (
        <StoreItemCard.Root
          key={`${item.object}-${item.id}`}
          purchased={item.is_purchased}
          onClick={() =>
            handleOpenBuyModal({ item, purchased: item.is_purchased })
          }
        >
          <StoreItemCard.Wrapper purchased={item.is_purchased}>
            <StoreItemCard.Header
              item={item}
              purchased={item.is_purchased}
              placeholdersProducts={placeholdersProducts}
              index={index}
            />
            <StoreItemCard.Info item={item} />
          </StoreItemCard.Wrapper>
        </StoreItemCard.Root>
      ))}

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

      {!!itemObject && modalBuyItems.length > 0 && openModalBuyItem && (
        <ModalBuyItem
          itemObject={itemObject}
          items={modalBuyItems}
          open={openModalBuyItem}
          setOpen={setOpenModalBuyItem}
          handleOpenModalConfirmation={handleOpenModalConfirmation}
        />
      )}
    </section>
  )
}
