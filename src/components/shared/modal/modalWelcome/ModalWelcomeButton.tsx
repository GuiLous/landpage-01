'use client'

import { useEffect } from 'react'

import { NOT_FIRST_ACCESS_KEY } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import { Button } from '@/components/shared'

interface ModalWelcomeButtonProps {
  open: boolean
  setOpen: (state: boolean) => void
  setOpenModalSendInvites: (state: boolean) => void
}

export function ModalWelcomeButton({
  open,
  setOpen,
  setOpenModalSendInvites,
}: ModalWelcomeButtonProps) {
  const { user } = useAppSelector((state) => state.user)

  const handleOpenModalSendInvites = () => {
    setOpenModalSendInvites(true)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      storageService.save(NOT_FIRST_ACCESS_KEY, user?.id)
    }
  }, [user, open])

  return (
    <Button.Root
      onClick={handleOpenModalSendInvites}
      className="min-h-[42px] max-w-fit px-4"
      type="submit"
    >
      <Button.Content className="text-sm font-semibold">
        Convide agora
      </Button.Content>
    </Button.Root>
  )
}
