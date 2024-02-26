import Image from 'next/image'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Profile } from '@/functions'

import { ProfileHeaderAvatar } from './ProfileHeaderAvatar'
import { ProfileHeaderLevel } from './ProfileHeaderLevel'
import { ProfileHeaderSocialButtons } from './ProfileHeaderSocialButtons'
import { ProfileHeaderStatus } from './ProfileHeaderStatus'

interface ProfileHeaderProps {
  profile: Profile
  isUserLogged: boolean
  children?: ReactNode
}

export function ProfileHeader({
  profile,
  isUserLogged,
  children,
}: ProfileHeaderProps) {
  return (
    <header
      className={twMerge(
        'relative flex-initial flex-col p-[3.750rem]',
        '3xl:py-11 3xl:px-7'
      )}
      style={{
        backgroundImage: profile.header ? `url(${profile.header})` : '',
      }}
      id="step-header"
    >
      {profile.header && (
        <Image
          src={profile.header}
          alt="Player header"
          fill
          sizes="100vw"
          priority
          unoptimized
          className="rounded-lg object-cover object-center"
        />
      )}

      <div
        className={twMerge(
          'items-end justify-between gap-[6.25rem] flex-initial z-10',
          '3xl:gap-5',
          'ultrawide:gap-'
        )}
      >
        <div
          className={twMerge(
            'items-center gap-4 max-w-[600px]',
            '3xl:gap-3.5 3xl:max-w-[520px]',
            'ultrawide:gap-8 ultrawide:max-w-[800px]'
          )}
        >
          <ProfileHeaderAvatar
            avatarUrl={profile.avatar.large}
            isUserLogged={isUserLogged}
          />

          <div
            className={twMerge(
              'flex-col gap-2.5',
              '3xl:gap-2',
              'ultrawide:gap-5'
            )}
          >
            <ProfileHeaderStatus
              status={profile.status}
              username={profile.username}
            />

            <ProfileHeaderLevel
              level={profile.level}
              level_points={profile.level_points}
            />

            <ProfileHeaderSocialButtons
              socials={profile.social_handles || []}
              isUserLogged={isUserLogged}
            />
          </div>
        </div>

        {children}
      </div>
    </header>
  )
}
