'use client'

import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { revalidatePath } from '@/utils'

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
  const handleCloseConfirmationModal = useCallback(() => {
    setOpen(false)
    Cookies.set('canOpenBuyModal', 'true')

    revalidatePath({ path: '/loja' })
  }, [setOpen])

  return (
    <Modal open={open} onOpenChange={handleCloseConfirmationModal}>
      <Modal.Content className="max-w-fit">
        <div className={twMerge('flex-col items-center gap-8', '3xl:gap-6')}>
          <ModalReloadCoinConfirmationHeader />
          <ModalReloadCoinConfirmationMessage />
        </div>
      </Modal.Content>
    </Modal>
  )
}
