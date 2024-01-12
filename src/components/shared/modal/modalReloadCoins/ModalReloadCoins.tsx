import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalReloadCoinsListCards } from './ModalReloadCoinsListCards'
import { ModalReloadCoinsMessage } from './ModalReloadCoinsMessage'
import { ModalReloadCoinsTerms } from './ModalReloadCoinsTerms'

interface ModalReloadCoinsProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalReloadCoins({ open, setOpen }: ModalReloadCoinsProps) {
  const handleCloseReloadCoins = () => {
    Cookies.remove('itemObject')
    Cookies.remove('itemId')
    Cookies.remove('canOpenBuyModal')

    setOpen(false)
  }

  return (
    <Modal open={open} onOpenChange={handleCloseReloadCoins}>
      <Modal.Content
        title="SELECIONE RELOAD COINS"
        className="max-w-max bg-transparent"
        isOver
      >
        <div
          className={twMerge(
            'mt-4 items-center justify-center flex-col gap-10',
            '3xl:mt-3 3xl:gap-8'
          )}
        >
          <ModalReloadCoinsMessage />

          <ModalReloadCoinsListCards open={open} />

          <ModalReloadCoinsTerms />
        </div>
      </Modal.Content>
    </Modal>
  )
}
