'use client'

import { ReactNode } from 'react'

import { Provider } from '@/contexts/select'

export const SelectProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>
}
