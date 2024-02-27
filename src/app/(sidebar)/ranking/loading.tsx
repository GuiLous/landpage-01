import { twMerge } from 'tailwind-merge'

import { RankingHeader } from '@/components/pages'

import { Skeleton } from '@/components/shared'

export default function loading() {
  return (
    <main
      className={twMerge(
        'flex-col gap-10 py-10 px-[4%]',
        '3xl:gap-8',
        'ultrawide:gap-14'
      )}
    >
      <RankingHeader />

      <section className={twMerge('flex-initial gap-6', '3xl:gap-4')}>
        {Array.from(Array(3)).map((_, index) => (
          <Skeleton
            key={index}
            className={twMerge(
              'flex-col min-h-[382px] max-w-full items-center rounded',
              '3xl:min-h-[284px]'
            )}
          />
        ))}
      </section>

      <div className={twMerge(' items-end justify-center pb-10')}>
        <Skeleton className="min-h-full max-w-full flex-1" />
      </div>
    </main>
  )
}
