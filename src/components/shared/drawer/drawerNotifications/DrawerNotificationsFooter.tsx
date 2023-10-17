import { useEffect, useState } from 'react'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { readAllNotifications } from '@/store/slices/notificationSlice'

import { notificationsApi } from '@/api'

import { Button } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

export function DrawerNotificationsFooter() {
  const notifications = useAppSelector((state) => state.notifications)

  const dispatch = useAppDispatch()

  const showErrorToast = useShowErrorToast()

  const [fetching, setFetching] = useState(false)
  const [totalNotificationsNotRead, setTotalNotificationsNotRead] = useState(0)

  const isButtonDisabled =
    notifications.length === 0 || totalNotificationsNotRead === 0

  const readAll = async () => {
    const userToken = storageService.get('token')

    if (notifications.length <= 0 || !userToken) return

    setFetching(true)

    const response = await notificationsApi.readAll(userToken)

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
