'use client'

import { useCheckMaintenance } from '@/hooks'

export function VerifyMaintenance() {
  useCheckMaintenance()

  return null
}
