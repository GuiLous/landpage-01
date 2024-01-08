'use client'
import { useUserStore } from '@/store/userStore'

import { Websocket } from './Websocket'

export function RenderWSS() {
  const user = useUserStore.getState().user

  return (
    <>{user && user.account && user.account.is_verified && <Websocket />}</>
  )
}
