'use client'

import { twMerge } from 'tailwind-merge'

import { revalidate } from '@/utils'

import { ItemType } from '@/functions'

import { Modal } from '@/components/shared'

import { ModalBuyItemConfirmationButton } from './ModalBuyItemConfirmationButton'
import { ModalBuyItemConfirmationImage } from './ModalBuyItemConfirmationImage'
import { ModalReloadCoinConfirmationHeader } from './ModalReloadCoinConfirmationHeader'
import { ModalReloadCoinConfirmationMessage } from './ModalReloadCoinConfirmationMessage'

interface ModalBuyItemConfirmationProps {
  open: boolean
  setOpen: (state: boolean) => void
  backgroundImage?: string
  foregroundImage: string
  isCardOrProfile: boolean
  itemId: number
  itemType: ItemType
  isBoxOrCollection: boolean
}

export function ModalBuyItemConfirmation({
  open,
  setOpen,
  foregroundImage,
  backgroundImage,
  isCardOrProfile,
  itemId,
  itemType,
  isBoxOrCollection,
}: ModalBuyItemConfirmationProps) {
  revalidate('inventory')
  revalidate('store')

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="max-w-fit">
        <div className={twMerge('flex-col items-center gap-8', '3xl:gap-6')}>
          <ModalReloadCoinConfirmationHeader />

          <ModalBuyItemConfirmationImage
            foregroundImage={foregroundImage}
            backgroundImage={backgroundImage}
          />

          <ModalReloadCoinConfirmationMessage />

          <ModalBuyItemConfirmationButton
            isCardOrProfile={isCardOrProfile}
            itemId={itemId}
            itemType={itemType}
            isBoxOrCollection={isBoxOrCollection}
          />
        </div>
      </Modal.Content>
    </Modal>
  )
}
