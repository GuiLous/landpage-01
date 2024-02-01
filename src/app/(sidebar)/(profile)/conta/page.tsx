import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import {
  AccountChangeEmailCard,
  AccountDeleteCard,
  AccountInactiveCard,
  AccountSectionTitle,
  ProfileDecorativeRender,
  ProfileHeaderRender,
} from '@/components/pages'

import {
  SkeletonAccountProfileDecorative,
  SkeletonProfileHeader,
} from '@/components/shared'

export default async function Account() {
  const auth = getAuthServer()

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <Suspense fallback={<SkeletonProfileHeader />}>
        <ProfileHeaderRender userId={auth.id} />
      </Suspense>

      <Suspense fallback={<SkeletonAccountProfileDecorative />}>
        <ProfileDecorativeRender />
      </Suspense>

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
