import { twMerge } from 'tailwind-merge'

import {
  SkeletonCarousel,
  SkeletonStoreListItems,
  SkeletonStoreRotationTimer,
} from '@/components/shared'

export default function loading() {
  return (
    <main className="flex-col gap-20">
      <SkeletonCarousel />

      <section
        className={twMerge(
          'flex-col gap-10 px-[7.5rem] pb-20',
          '3xl:px-[5.75rem]'
        )}
      >
        <SkeletonStoreRotationTimer />

        <SkeletonStoreListItems />
      </section>
    </main>
  )
}
