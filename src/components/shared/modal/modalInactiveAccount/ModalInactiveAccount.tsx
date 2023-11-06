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
        className="min-w-[784px] max-w-[784px]"
      >
        <div className="mt-10 flex-col items-center justify-center gap-10">
          <ModalInactiveAccountMessage />

          <ModalInactiveAccountFormButton />
        </div>
      </Modal.Content>
    </Modal>
  )
}
