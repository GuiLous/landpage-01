'use client'

import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { Button } from '@/components/shared'

interface CarouselItemContentButtonProps {
  item: StoreItem
  openModalBuyItem: boolean
  setOpenModalBuyItem: (state: boolean) => void
}

export function CarouselItemContentButton({
  item,
  openModalBuyItem,
  setOpenModalBuyItem,
}: CarouselItemContentButtonProps) {
  const isBox = item?.object === 'box'

  const isCollection = item?.object === 'collection'

  let modalBuyItems: StoreItem[] = []

  modalBuyItems = (isBox || isCollection) && item?.items ? [...item.items] : []

  if (!isBox && !isCollection) {
    modalBuyItems = [item]
  }

  return (
    <>
      <Button.Root
        className={twMerge('max-h-[42px] w-[180px]', '3xl:max-h-[38px]')}
      >
        <Button.Content className={twMerge('text-lg', '3xl:text-base')}>
          RC {item.price}
        </Button.Content>
      </Button.Root>

      {modalBuyItems.length > 0 && 'modal'}
    </>
  )
}
