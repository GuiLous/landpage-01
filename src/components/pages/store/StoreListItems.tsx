'use client'

import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import {
  ModalBuyItem,
  ModalBuyItemConfirmation,
  StoreItemCard,
} from '@/components/shared'

import { useAudio } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface StoreListItemsProps {
  products: StoreItem[]
  placeholdersProducts: string[]
}

export function StoreListItems({
  products,
  placeholdersProducts,
}: StoreListItemsProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

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

    playSoundClick()

    setItemObject(item)
    getModalBuyItems(item)

    setOpenModalBuyItem(true)
  }

  const isBoxOrCollection = useCallback(() => {
    if (!itemPurchased) return false

    const isBox = itemPurchased?.object === 'box'
    const isCollection = itemPurchased?.object === 'collection'

    return isBox || isCollection
  }, [itemPurchased])

  const getModalBuyItems = useCallback((item: StoreItem) => {
    const isBox = item?.object === 'box'
    const isCollection = item?.object === 'collection'

    let modalBuyItems: StoreItem[] = []

    modalBuyItems =
      (isBox || isCollection) && item?.items ? [...item.items] : []

    if (!isBox && !isCollection) {
      modalBuyItems = [item]
    }

    setModalBuyItems(modalBuyItems)
  }, [])

  useEffect(() => {
    if (!openModalConfirmation) {
      Cookies.remove('purchasedItemId')
      Cookies.remove('purchasedItemType')
    }
  }, [openModalConfirmation])

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
          onMouseEnter={!item.is_purchased ? playSoundHover : undefined}
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
          isBoxOrCollection={isBoxOrCollection()}
          itemId={itemPurchased.id}
          itemType={itemPurchased.item_type}
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
