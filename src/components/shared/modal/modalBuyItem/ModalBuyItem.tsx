'use client'

import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CenteredCarouselWrapper, Modal } from '@/components/shared'

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

  const imagesPreview = [
    {
      id: new Date().getTime(),
      file: isBoxOrCollection
        ? items[activeItemIndex]?.foreground_image
        : itemObject.foreground_image,
      media_type: 'image',
    },
    ...items[activeItemIndex]?.media,
  ]

  const currentFile =
    previewSelected === 0
      ? {
          id: new Date().getTime(),
          file: isBoxOrCollection
            ? items[activeItemIndex]?.foreground_image
            : itemObject.foreground_image,
          media_type: 'image',
        }
      : items[activeItemIndex]?.media[previewSelected - 1]

  return (
    <Modal open={open} onOpenChange={handleCloseModal}>
      <Modal.Content className={twMerge('max-w-[1078px] 3xl:max-w-[918px]')}>
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
            <CenteredCarouselWrapper
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
