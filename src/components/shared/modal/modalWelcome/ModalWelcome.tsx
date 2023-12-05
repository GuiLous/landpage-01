import { Modal } from '@/components/shared'

import { ModalWelcomeButton } from './ModalWelcomeButton'
import { ModalWelcomeMessage } from './ModalWelcomeMessage'

interface ModalWelcomeProps {
  open: boolean
  setOpen: (state: boolean) => void
  setOpenModalSendInvites: (state: boolean) => void
}

export function ModalWelcome({
  open,
  setOpen,
  setOpenModalSendInvites,
}: ModalWelcomeProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title="BOAS VINDAS A RELOADCLUB!"
        className="min-w-[564px] max-w-[564px]"
      >
        <div className="mt-6 flex-col items-center justify-center gap-10">
          <ModalWelcomeMessage />

          <ModalWelcomeButton
            open={open}
            setOpen={setOpen}
            setOpenModalSendInvites={setOpenModalSendInvites}
          />
        </div>
      </Modal.Content>
    </Modal>
  )
}
