import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { getUserProfile } from '@/functions'

import { InventoryWrapper } from '@/components/pages/inventory/InventoryWrapper'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

export default async function Inventory() {
  const auth = getAuthServer()

  const profile = await getUserProfile(auth?.id)

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <ProfileHeader isUserLogged profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged
          userId={auth?.id}
          username={profile.username}
        />
      </ProfileHeader>

      <InventoryWrapper />
    </main>
  )
}
