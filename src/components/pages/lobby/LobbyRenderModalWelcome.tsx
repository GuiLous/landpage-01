'use client'

import { useEffect, useState } from 'react'

import { NOT_FIRST_ACCESS_KEY } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import { ModalSendInvites, ModalWelcome } from '@/components/shared'

export function LobbyRenderModalWelcome() {
  const { user } = useAppSelector((state) => state.user)

  const [openModalWelcome, setOpenModalWelcome] = useState(false)
  const [openModalSendInvites, setOpenModalSendInvites] = useState(false)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_INVITES === 'true') {
      const firstAccess = storageService.get(NOT_FIRST_ACCESS_KEY)

      if (
        Number(firstAccess) !== user?.id &&
        user?.invites_available_count &&
        user?.invites_available_count > 0
      ) {
        setOpenModalWelcome(true)
      }
    }
  }, [user])

  return (
    <>
      <ModalWelcome
        open={openModalWelcome}
        setOpen={setOpenModalWelcome}
        setOpenModalSendInvites={setOpenModalSendInvites}
      />

      <ModalSendInvites
        open={openModalSendInvites}
        setOpen={setOpenModalSendInvites}
      />
    </>
  )
}
