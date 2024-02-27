import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalMatchFoundButtons } from './ModalMatchFoundButtons'
import { ModalMatchFoundPlayersIcon } from './ModalMatchFoundPlayersIcon'

interface ModalMatchFoundProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalMatchFound({ open, setOpen }: ModalMatchFoundProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        showCloseButton={false}
        title="PARTIDA ENCONTRADA"
        className={twMerge(
          'min-w-[650px] max-w-[650px] ultrawide:min-w-[850px] ultrawide:max-w-[850px]'
        )}
      >
        <div className="mt-3 flex-col items-center justify-center gap-10">
          <h3
            className={twMerge(
              'text-center text-sm text-cyan-400',
              'ultrawide:text-xl'
            )}
          >
            Ranqueada · 5x5
          </h3>

          <ModalMatchFoundPlayersIcon />

          <ModalMatchFoundButtons open={open} />
        </div>
      </Modal.Content>
    </Modal>
  )
}
