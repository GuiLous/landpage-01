import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

interface SkeletonAccountPlayerDecorationPreviewProps {
  isProfileCover: boolean
}

export function SkeletonAccountPlayerDecorationPreview({
  isProfileCover,
}: SkeletonAccountPlayerDecorationPreviewProps) {
  return (
    <Skeleton
      className={twMerge(
        'flex-initial items-center justify-center bg-no-repeat bg-contain rounded-lg h-full max-w-full min-w-[180px]',
        '3xl:min-w-[155px]',
        !isProfileCover && 'max-w-fit'
      )}
    />
  )
}
