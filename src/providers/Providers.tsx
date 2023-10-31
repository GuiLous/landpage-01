'use client'

import { ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { ProfileDetailsProvider } from '@/contexts'

import { store } from '@/store'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider store={store}>
      <ProfileDetailsProvider>{children}</ProfileDetailsProvider>
    </StoreProvider>
  )
}
