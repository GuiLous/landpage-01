'use client'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { accountsApi } from '@/api'

import { Button, Modal } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

interface ModalLogoutProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalLogout({ open, setOpen }: ModalLogoutProps) {
  const router = useRouter()
  const showErrorToast = useShowErrorToast()

  const [fetching, setFetching] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleLogout = useCallback(async () => {
    const token = storageService.get('token')

    if (!token) return

    setFetching(true)
    const response = await accountsApi.logout(token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setFetching(false)
      return
    }

    storageService.remove('token')
    router.push('/')
  }, [showErrorToast, router])

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content title="ESTÁ INDO EMBORA?" className={twMerge('')}>
        <div className="mt-10 flex-col items-center justify-center gap-10">
          <p className="max-w-[326px] text-center text-sm text-white">
            Você está prestes a fazer logout da sua conta. Tem certeza de que
            deseja sair?
          </p>

          <div className="flex-initial items-center justify-center gap-3.5">
            <Button.Root
              disabled={fetching}
              className="w-full max-w-[102px]"
              type="submit"
              neutral
              onClick={handleCloseModal}
            >
              <Button.Content
                disabled={fetching}
                neutral
                className="text-sm font-semibold"
              >
                Cancelar
              </Button.Content>
            </Button.Root>

            <Button.Root
              disabled={fetching}
              className="w-full max-w-[102px]"
              type="submit"
              restricted
              onClick={handleLogout}
            >
              {fetching && <Button.Spinner bgStyle="bg-red-500" />}

              <Button.Content
                isLoading={fetching}
                className="text-sm font-semibold"
                loadingText="Saindo"
              >
                Sair
              </Button.Content>
            </Button.Root>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}
