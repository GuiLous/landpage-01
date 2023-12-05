'use client'

import { useState } from 'react'

import { useAppSelector } from '@/store'

import { Modal } from '@/components/shared'

import { ModalSendInvitesChangeViewButton } from './ModalSendInvitesChangeViewButton'
import { ModalSendInvitesForm } from './ModalSendInvitesForm'
import { ModalSendInvitesInitialMessage } from './ModalSendInvitesInitialMessage'
import { ModalSendInvitesSent } from './ModalSendInvitesSent'

interface ModalSendInvitesProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalSendInvites({ open, setOpen }: ModalSendInvitesProps) {
  const { user } = useAppSelector((state) => state.user)

  const [changeView, setChangeView] = useState(false)

  const hasInvites =
    !!user?.invites_available_count && user.invites_available_count > 0

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title={changeView ? undefined : 'CONVITES EXCLUSIVOS'}
        className="min-w-[608px] max-w-[608px]"
      >
        {changeView ? (
          <ModalSendInvitesSent
            changeView={changeView}
            setChangeView={setChangeView}
            invites={user?.invites || []}
          />
        ) : (
          <div className="mt-6 flex-col items-center justify-center gap-10">
            {hasInvites ? (
              <ModalSendInvitesInitialMessage />
            ) : (
              <p className="min-w-[542px] text-center text-sm leading-none text-white">
                Você não tem mais convites disponíveis.
              </p>
            )}

            <ModalSendInvitesForm hasInvites={hasInvites} />

            <ModalSendInvitesChangeViewButton
              changeView={changeView}
              setChangeView={setChangeView}
            />
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}
