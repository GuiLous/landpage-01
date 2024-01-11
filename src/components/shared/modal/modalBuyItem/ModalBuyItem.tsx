'use client'

import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { Modal } from '@/components/shared'

import { ModalBuyItemCarousel } from './ModalBuyItemCarousel'
import { ModalBuyItemInfos } from './ModalBuyItemInfos'
import { ModalBuyItemPreview } from './ModalBuyItemPreview'
import { ModalBuyItemThumbs } from './ModalBuyItemThumbs'

interface ModalBuyItemProps {
  open: boolean
  setOpen: (state: boolean) => void
  items: StoreItem[]
  itemObject: StoreItem
  setItemToModal?: (state: StoreItem | null) => void
  handleOpenModalConfirmation: (item: StoreItem) => void
}

export function ModalBuyItem({
  open,
  setOpen,
  itemObject,
  items = [],
  setItemToModal,
  handleOpenModalConfirmation,
}: ModalBuyItemProps) {
  const [previewSelected, setPreviewSelected] = useState(0)
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const handleCloseModal = useCallback(() => {
    setOpen(false)

    if (setItemToModal) {
      setItemToModal(null)
    }
  }, [setItemToModal, setOpen])

  const isBoxOrCollection =
    itemObject.object === 'box' || itemObject.object === 'collection'

  const imagesPreview = useMemo(() => {
    return [
      {
        file: isBoxOrCollection
          ? items[activeItemIndex].foreground_image
          : itemObject.foreground_image,
        media_type: 'image',
      },
      ...items[activeItemIndex]?.media,
    ]
  }, [activeItemIndex, isBoxOrCollection, itemObject, items])

  const currentFile = useMemo(() => {
    return previewSelected === 0
      ? {
          file: isBoxOrCollection
            ? items[activeItemIndex].foreground_image
            : itemObject.foreground_image,
          media_type: 'image',
          id: new Date().getTime(),
        }
      : items[activeItemIndex]?.media[previewSelected - 1]
  }, [activeItemIndex, isBoxOrCollection, itemObject, items, previewSelected])

  return (
    <Modal open={open} onOpenChange={handleCloseModal}>
      <Modal.Content className="max-w-fit">
        <div className={twMerge('flex-col items-center gap-14', '3xl:gap-9')}>
          <div className={twMerge('gap-10', '3xl:gap-8')}>
            <div className={twMerge('gap-4', '3xl:gap-3')}>
              <ModalBuyItemThumbs
                imagesPreview={imagesPreview}
                previewSelected={previewSelected}
                setPreviewSelected={setPreviewSelected}
              />

              <ModalBuyItemPreview
                currentFile={currentFile}
                previewSelected={previewSelected}
              />
            </div>

            <ModalBuyItemInfos
              item={items[activeItemIndex]}
              itemObject={itemObject}
              handleCloseModal={handleCloseModal}
              handleOpenModalConfirmation={handleOpenModalConfirmation}
            />
          </div>

          {isBoxOrCollection && (
            <ModalBuyItemCarousel
              data={items}
              setActiveItemIndex={setActiveItemIndex}
              setPreviewSelected={setPreviewSelected}
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}
