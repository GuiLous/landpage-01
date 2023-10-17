'use client'

import { ReactNode } from 'react'

interface SelectWrapperProps {
  children?: ReactNode
}

export function SelectWrapper({ children }: SelectWrapperProps) {
  return <div className="relative z-20 flex-col">{children}</div>
}
