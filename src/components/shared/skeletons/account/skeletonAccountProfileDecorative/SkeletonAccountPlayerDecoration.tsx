import { twMerge } from 'tailwind-merge'

import { AccountPlayerDecorationButtons } from '@/components/pages/account/accountPlayerDecoration/AccountPlayerDecorationButtons'

import { ProfileCard } from '@/components/shared/profile/profileCard/ProfileCard'

import { SkeletonItemsSelectList } from '../SkeletonItemsSelectList'
import { SkeletonAccountPlayerDecorationPreview } from './SkeletonAccountPlayerDecorationPreview'

interface SkeletonAccountPlayerDecorationProps {
  isProfileCover?: boolean
  title: string
}

export function SkeletonAccountPlayerDecoration({
  title,
  isProfileCover = false,
}: SkeletonAccountPlayerDecorationProps) {
  return (
    <ProfileCard
      variant="account"
      title={title}
      maxWidth={!isProfileCover ? '47%' : '100%'}
    >
      <div className={twMerge('flex-col gap-8 h-full', '3xl:gap-7')}>
        <div
          className={twMerge(
            'gap-6 h-full',
            isProfileCover && 'flex-col',
            '3xl:gap-5'
          )}
        >
          <SkeletonAccountPlayerDecorationPreview
            isProfileCover={isProfileCover}
          />

          <div
            className={twMerge(
              'flex-col bg-gray-700/40 rounded-lg h-full max-h-[345px] min-h-[345px] py-2.5 pr-1 pl-2.5',
              '3xl:max-h-[300px] 3xl:min-h-[300px]',
              isProfileCover &&
                'max-h-[204px] min-h-[204px] 3xl:max-h-[184px] 3xl:min-h-[184px]'
            )}
          >
            <SkeletonItemsSelectList isAccountPage />
          </div>
        </div>

        <AccountPlayerDecorationButtons
          isProfileCover={isProfileCover}
          itemSelected={null}
        />
      </div>
    </ProfileCard>
  )
}
