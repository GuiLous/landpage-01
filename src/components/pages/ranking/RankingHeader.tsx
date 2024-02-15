import { MdOutlineBarChart } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

export function RankingHeader() {
  return (
    <header className="max-w-fit flex-initial items-center">
      <div className="flex-initial items-center justify-start gap-3">
        <CustomIcon
          icon={MdOutlineBarChart}
          className={twMerge('text-2xl', 'ultrawide:text-4xl')}
        />

        <div className="gap-1">
          <h1
            className={twMerge(
              'text-lg uppercase',
              'leading-none',
              'ultrawide:text-4xl ultrawide:leading-none'
            )}
          >
            Ranking
          </h1>
          <span
            className={twMerge(
              'text-lg font-bold uppercase',
              'leading-none',
              'ultrawide:text-4xl ultrawide:leading-none'
            )}
          >
            Top 100
          </span>
        </div>
      </div>
    </header>
  )
}
