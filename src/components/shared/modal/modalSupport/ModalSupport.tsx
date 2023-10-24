'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Modal } from '@/components/shared'

import { ModalSupportConfirmation } from './ModalSupportConfirmation'
import { ModalSupportDescription } from './ModalSupportDescription'
import { ModalSupportForm } from './ModalSupportForm'

interface ModalSupportProps {
  open: boolean
  setOpen: (state: boolean) => void
  user_id?: number
  username?: string
}

export function ModalSupport({
  open,
  setOpen,
  user_id,
  username,
}: ModalSupportProps) {
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    if (!open) {
      setFormSent(false)
    }
  }, [open])

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        title="SUPORTE RELOAD CLUB"
        className={twMerge(
          'min-w-[580px] max-w-[580px]',
          '3xl:min-w-[470px] 3xl:max-w-[470px]',
          formSent && 'min-w-fit max-w-fit 3xl:min-w-fit 3xl:max-w-fit'
        )}
      >
        {formSent ? (
          <ModalSupportConfirmation />
        ) : (
          <div
            className={twMerge(
              'mt-6 flex-col items-center justify-center gap-8',
              '3xl:mt-5 3xl:gap-5'
            )}
          >
            <ModalSupportDescription />

            <ModalSupportForm
              open={open}
              setFormSent={setFormSent}
              user_id={user_id}
              username={username}
            />
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}
