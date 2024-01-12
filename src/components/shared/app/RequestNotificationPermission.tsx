'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/store/userStore'

export function RequestNotificationPermission() {
  const user = useUserStore.getState().user

  useEffect(() => {
    if (user && user.account && user.account.is_verified) {
      Notification.requestPermission()
    }
  }, [user])

  return null
}
