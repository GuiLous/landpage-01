import { twMerge } from 'tailwind-merge'

import { LineupPlayBtn } from '../../lineup/LineupPlayBtn'
import { SkeletonLineupCustomFilters } from './SkeletonLineupCustomFilters'
import { SkeletonLineupCustomPlayersWrapper } from './SkeletonLineupCustomPlayersWrapper'

export function SkeletonLineupCustom() {
  return (
    <section className="flex-col items-center justify-center gap-10 px-[10%]">
      <div className="flex-col gap-8">
        <SkeletonLineupCustomFilters />

        <SkeletonLineupCustomPlayersWrapper />
      </div>

      <div
        className={twMerge(
          'max-w-[280px] flex-initial',
          'ultrawide:max-w-[532px]'
        )}
      >
        <LineupPlayBtn isOwner={false} />
      </div>
    </section>
  )
}
