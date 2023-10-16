import { twMerge } from 'tailwind-merge'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'

interface useLatestMatchesResultsProps {
  latestMatchesResults: LatestMatchesResult[]
  colorize?: boolean
}

export const useLatestMatchesResults = ({
  latestMatchesResults,
  colorize = true,
}: useLatestMatchesResultsProps) =>
  latestMatchesResults.map((matchResultItem, index) => (
    <div className="max-w-fit flex-initial" key={index}>
      <span
        className={twMerge(
          'text-white 3xl:text-sm font-semibold',
          colorize &&
            (matchResultItem === 'V' ? 'text-cyan-400' : 'text-gray-300')
        )}
      >
        {matchResultItem}
      </span>
      <span
        className={twMerge(
          '3xl:text-sm text-white font-semibold',
          colorize && 'text-gray-300'
        )}
        style={{ marginLeft: '3px', marginRight: '3px' }}
      >
        {latestMatchesResults.length !== index + 1 && ' - '}
      </span>
    </div>
  ))
