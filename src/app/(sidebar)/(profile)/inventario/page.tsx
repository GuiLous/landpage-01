import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { ProfileHeaderRender } from '@/components/pages'
import { InventoryWrapper } from '@/components/pages/inventory/InventoryWrapper'

import { SkeletonInventory, SkeletonProfileHeader } from '@/components/shared'

export default async function Inventory() {
  const auth = getAuthServer()

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <Suspense fallback={<SkeletonProfileHeader />}>
        <ProfileHeaderRender userId={auth.id} />
      </Suspense>

      <Suspense fallback={<SkeletonInventory />}>
        <InventoryWrapper />
      </Suspense>
    </main>
  )
}
