import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { getUserProfile } from '@/functions'

import { InventoryWrapper } from '@/components/pages/inventory/InventoryWrapper'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

interface RouteProps {
  params: { userId: string }
}

export default async function Inventory({ params }: RouteProps) {
  const auth = getAuthServer()

  const { userId } = params

  const profile = await getUserProfile(Number(userId))

  const isUserLogged = Number(userId) === auth?.id

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <ProfileHeader isUserLogged={isUserLogged} profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged={isUserLogged}
          userId={Number(userId)}
          username={profile.username}
        />
      </ProfileHeader>

      <InventoryWrapper />
    </main>
  )
}
