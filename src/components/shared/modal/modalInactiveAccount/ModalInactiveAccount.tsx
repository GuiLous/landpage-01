import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalInactiveAccountFormButton } from './ModalInactiveAccountFormButton'
import { ModalInactiveAccountMessage } from './ModalInactiveAccountMessage'

interface ModalInactiveAccountProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalInactiveAccount({
  open,
  setOpen,
}: ModalInactiveAccountProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title="INATIVAR CONTA"
        className={twMerge(
          'min-w-[784px] max-w-[784px]',
          'ultrawide:min-w-[1084px] ultrawide:max-w-[1084px]'
        )}
      >
        <div className="mt-10 flex-col items-center justify-center gap-10">
          <ModalInactiveAccountMessage />

          <ModalInactiveAccountFormButton />
        </div>
      </Modal.Content>
    </Modal>
  )
}
