'use client'

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useProfileDetails } from '@/contexts'

import { useAppSelector } from '@/store'

import {
  Loading,
  ProfileHeader,
  ProfileHeaderTabsButtons,
} from '@/components/shared'

interface ProfileProps {
  params: { userId: string }
}

export default function Profile({ params }: ProfileProps) {
  const { user } = useAppSelector((state) => state.user)
  const { userId } = params

  const { fetching, profile, getProfileDetails } = useProfileDetails()

  const isUserLogged = Number(userId) === user?.id

  useEffect(() => {
    getProfileDetails(Number(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return fetching ? (
    <Loading.Overlay>
      <Loading.Gif />
    </Loading.Overlay>
  ) : (
    <main className={twMerge('flex-col gap-10', '3xl:gap-[1.875rem]')}>
      <ProfileHeader isUserLogged={isUserLogged} profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged={isUserLogged}
          userId={Number(userId)}
          username={profile.username}
        />
      </ProfileHeader>

      <section>
        <div>
          <div>Stats</div>
          <div>HeatMap</div>
        </div>

        <div>MatchHistory</div>
      </section>
    </main>
  )
}
