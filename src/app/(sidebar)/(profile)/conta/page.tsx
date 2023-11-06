import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { getUserProfile } from '@/functions'

import {
  AccountChangeEmailCard,
  AccountDeleteCard,
  AccountInactiveCard,
  AccountTitle,
} from '@/components/pages'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

export default async function Account() {
  const auth = getAuthServer()

  const profile = await getUserProfile(Number(auth.id))

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <ProfileHeader isUserLogged={true} profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged={true}
          userId={Number(auth.id)}
          username={profile.username}
        />
      </ProfileHeader>

      <AccountTitle />

      <section
        className={twMerge(
          'flex-initial flex-col gap-6 px-[3.750rem]',
          '3xl:px-7 3xl:gap-5'
        )}
      >
        <AccountChangeEmailCard />

        <div className={twMerge('gap-6', '3xl:gap-5')}>
          <AccountInactiveCard />
          <AccountDeleteCard />
        </div>
      </section>
    </main>
  )
}
