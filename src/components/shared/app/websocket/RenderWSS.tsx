'use client'

import { useAppSelector } from '@/store'

import { Websocket } from './Websocket'

export function RenderWSS() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <>{user && user.account && user.account.is_verified && <Websocket />}</>
  )
}
