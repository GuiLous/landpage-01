import { ReactNode } from 'react'

import { Modal } from '@/components/shared'

interface ModalAddSocialProps {
  open: boolean
  setOpen: (state: boolean) => void
  children: ReactNode
}

export function ModalAddSocial({
  open,
  setOpen,
  children,
}: ModalAddSocialProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title="REDES SOCIAIS"
        justifyTitle="start"
        className="min-w-[580px] max-w-[580px]"
      >
        <div className="mt-6 flex-col items-center justify-center gap-10">
          <div className="flex-col gap-1.5">
            <p className="text-left text-sm text-white">
              Adicione suas redes sociais. Elas ficarão visíveis no seu perfil.
            </p>

            <p className="max-w-[500px] text-xs leading-normal text-gray-300">
              Não adicione links nessa área. Coloque apenas o nome do canal
              (handle) ou a hash do convite para um servidor no Discord.
            </p>
          </div>

          {children}
        </div>
      </Modal.Content>
    </Modal>
  )
}
