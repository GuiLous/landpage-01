import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalDeleteAccountFormButton } from './ModalDeleteAccountFormButton'
import { ModalDeleteAccountMessage } from './ModalDeleteAccountMessage'

interface ModalDeleteAccountProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalDeleteAccount({ open, setOpen }: ModalDeleteAccountProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title="EXCLUIR CONTA"
        className={twMerge(
          'min-w-[784px] max-w-[784px]',
          'ultrawide:min-w-[1084px] ultrawide:max-w-[1084px]'
        )}
      >
        <div className="mt-10 flex-col items-center justify-center gap-10">
          <ModalDeleteAccountMessage />

          <ModalDeleteAccountFormButton />
        </div>
      </Modal.Content>
    </Modal>
  )
}
