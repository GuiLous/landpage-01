import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import { readAllNotifications } from '@/store/slices/notificationSlice'

import { notificationsApi } from '@/modelsApi'

import { Button } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function DrawerNotificationsFooter() {
  const notifications = useAppSelector((state) => state.notifications)

  const dispatch = useAppDispatch()

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [fetching, setFetching] = useState(false)
  const [totalNotificationsNotRead, setTotalNotificationsNotRead] = useState(0)

  const isButtonDisabled =
    notifications.length === 0 || totalNotificationsNotRead === 0

  const readAll = async () => {
    if (notifications.length <= 0 || !auth?.token) return

    setFetching(true)

    const response = await notificationsApi.readAll(auth.token)

    if (response.errorMsg) showErrorToast(response.errorMsg)
    else if (response) dispatch(readAllNotifications())

    setFetching(false)
  }

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const totalNotificationsNotRead = notifications.filter(
        (notification) => notification.read_date === null
      )

      setTotalNotificationsNotRead(totalNotificationsNotRead.length)
    }
  }, [notifications])

  return (
    <div className="flex-initial px-6">
      <Button.Root
        disabled={isButtonDisabled}
        onClick={readAll}
        className="w-full"
      >
        {fetching && <Button.Spinner />}

        <Button.Content
          disabled={isButtonDisabled}
          isLoading={fetching}
          loadingText="Lendo"
          className="text-sm font-semibold"
        >
          Ler tudo
        </Button.Content>
      </Button.Root>
    </div>
  )
}
