'use client'

import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalReloadCoinConfirmationHeader } from './ModalReloadCoinConfirmationHeader'
import { ModalReloadCoinConfirmationMessage } from './ModalReloadCoinConfirmationMessage'

interface modalReloadCoinConfirmationProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalReloadCoinConfirmation({
  open,
  setOpen,
}: modalReloadCoinConfirmationProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="max-w-fit">
        <div className={twMerge('flex-col items-center gap-8', '3xl:gap-6')}>
          <ModalReloadCoinConfirmationHeader />
          <ModalReloadCoinConfirmationMessage />
        </div>
      </Modal.Content>
    </Modal>
  )
}
