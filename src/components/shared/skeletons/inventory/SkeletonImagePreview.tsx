import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonImagePreview() {
  return (
    <Skeleton
      className={twMerge(
        'flex-1 max-w-full max-h-imagePreview',
        `3xl:max-h-imagePreviewLaptop`
      )}
    />
  )
}
