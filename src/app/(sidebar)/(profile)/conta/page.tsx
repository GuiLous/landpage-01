import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { getUserInventory, getUserProfile } from '@/functions'

import {
  AccountChangeEmailCard,
  AccountDeleteCard,
  AccountInactiveCard,
  AccountPlayerDecoration,
  AccountSectionTitle,
} from '@/components/pages'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

export default async function Account() {
  const auth = getAuthServer()

  const profile = await getUserProfile(Number(auth.id))
  const inventory = await getUserInventory()

  const cards = inventory.items.filter((item) => item.subtype === 'card')
  const covers = inventory.items.filter((item) => item.subtype === 'profile')

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <ProfileHeader isUserLogged={true} profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged={true}
          userId={Number(auth.id)}
          username={profile.username}
        />
      </ProfileHeader>

      <section className={twMerge('flex-col gap-10', '3xl:gap-7')}>
        <AccountSectionTitle title="personalização de perfil" />

        <div
          className={twMerge(
            'flex-initial flex-col gap-6 px-[3.750rem]',
            '3xl:px-7 3xl:gap-5'
          )}
        >
          <div className={twMerge('gap-10', '3xl:gap-7')}>
            <AccountPlayerDecoration title="Card de jogador" items={cards} />
            <AccountPlayerDecoration
              title="Capa de perfil"
              items={covers}
              isProfileCover
            />
          </div>
        </div>
      </section>

      <section className={twMerge('flex-col gap-10', '3xl:gap-7')}>
        <AccountSectionTitle title="configurações de conta" />

        <div
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
        </div>
      </section>
    </main>
  )
}
