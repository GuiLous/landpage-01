import { Modal } from '@/components/shared'

import { ModalLogoutButtons } from './ModalLogoutButtons'

interface ModalLogoutProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalLogout({ open, setOpen }: ModalLogoutProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content title="ESTÁ INDO EMBORA?">
        <div className="mt-10 flex-col items-center justify-center gap-10">
          <p className="max-w-[326px] text-center text-sm text-white">
            Você está prestes a fazer logout da sua conta. Tem certeza de que
            deseja sair?
          </p>

          <ModalLogoutButtons setOpen={setOpen} />
        </div>
      </Modal.Content>
    </Modal>
  )
}
