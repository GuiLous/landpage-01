'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { accountsApi } from '@/modelsApi'

import { Button, Modal } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface ModalLogoutProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalLogout({ open, setOpen }: ModalLogoutProps) {
  const router = useRouter()
  const showErrorToast = useShowErrorToast()

  const getAuth = useAuth()
  const auth = getAuth()

  const [fetching, setFetching] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleLogout = useCallback(async () => {
    if (!auth?.token) return

    setFetching(true)
    const response = await accountsApi.logout(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setFetching(false)
      return
    }

    Cookies.remove('token')

    return router.push('/')
  }, [showErrorToast, router, auth])

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content title="ESTÁ INDO EMBORA?">
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
