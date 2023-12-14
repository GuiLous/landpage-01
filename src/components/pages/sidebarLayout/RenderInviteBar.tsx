'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useAppSelector } from '@/store'

import { InviteBar, ModalSendInvites } from '@/components/shared'

export function RenderInviteBar() {
  const { user } = useAppSelector((state) => state.user)

  const [openModalSendInvites, setOpenModalSendInvites] = useState(false)

  const pathname = usePathname()

  const showInviteBar =
    pathname === '/jogar' &&
    user?.invites_available_count &&
    user.invites_available_count > 0 &&
    process.env.NEXT_PUBLIC_USE_INVITES === 'true'

  if (!showInviteBar) return null

  return (
    <>
      <InviteBar setOpenModalSendInvites={setOpenModalSendInvites} />

      <ModalSendInvites
        open={openModalSendInvites}
        setOpen={setOpenModalSendInvites}
      />
    </>
  )
}
