import { Modal } from '@/components/shared'

import { ModalMatchFoundButtons } from './ModalMatchFoundButtons'
import { ModalMatchFoundPlayersIcon } from './ModalMatchFoundPlayersIcon'

interface ModalLogoutProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalMatchFound({ open, setOpen }: ModalLogoutProps) {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        showCloseButton={false}
        title="PARTIDA ENCONTRADA"
        className="min-w-[650px] max-w-[650px]"
      >
        <div className="mt-3 flex-col items-center justify-center gap-10">
          <h3 className="text-center text-sm text-cyan-400">Ranqueada · 5x5</h3>

          <ModalMatchFoundPlayersIcon />

          <ModalMatchFoundButtons open={open} />
        </div>
      </Modal.Content>
    </Modal>
  )
}
