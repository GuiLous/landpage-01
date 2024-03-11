import { getAuthServer } from '@/utils'

import { getUserProfile } from '@/functions'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

interface ProfileHeaderRenderProps {
  userId: number
}

export async function ProfileHeaderRender({
  userId,
}: ProfileHeaderRenderProps) {
  const auth = await getAuthServer()

  const profile = await getUserProfile(userId)

  const isUserLogged = userId === auth?.id

  return (
    <ProfileHeader isUserLogged={isUserLogged} profile={profile}>
      <ProfileHeaderTabsButtons
        isUserLogged={isUserLogged}
        userId={userId}
        username={profile.username}
      />
    </ProfileHeader>
  )
}
