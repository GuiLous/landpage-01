import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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
        className={twMerge(
          'min-w-[580px] max-w-[580px] ultrawide:min-w-[820px] ultrawide:max-w-[820px]'
        )}
      >
        <div
          className={twMerge(
            'mt-6 flex-col items-center justify-center gap-10',
            'ultrawide:gap-16'
          )}
        >
          <div className="flex-col gap-1.5">
            <p
              className={twMerge(
                'text-left text-sm text-white',
                'ultrawide:text-2xl'
              )}
            >
              Adicione suas redes sociais. Elas ficarão visíveis no seu perfil.
            </p>

            <p
              className={twMerge(
                'max-w-[500px] text-xs leading-normal text-gray-300',
                'ultrawide:text-xl ultrawide:max-w-[700px]'
              )}
            >
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
