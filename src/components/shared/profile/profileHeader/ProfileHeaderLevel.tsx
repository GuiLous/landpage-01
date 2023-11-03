import { twMerge } from 'tailwind-merge'

interface ProfileHeaderLevelProps {
  level_points: number
  level: number
}

export function ProfileHeaderLevel({
  level,
  level_points,
}: ProfileHeaderLevelProps) {
  return (
    <div className={twMerge('flex-col gap-2', '3xl:gap-1.5')}>
      <div
        className={twMerge(
          'min-h-[9px] overflow-hidden border-0 rounded-lg bg-gray-50',
          '3xl:min-h-2'
        )}
      >
        <div
          className="flex-initial rounded-lg bg-purple-400"
          style={{ width: `${level_points}%` }}
        />
      </div>

      <div className="justify-between">
        <span
          className={twMerge('font-medium text-white text-sm', '3xl:text-xs')}
        >
          Level {level}
        </span>

        <span
          className={twMerge('font-medium text-white text-sm', '3xl:text-xs')}
        >
          {level_points}/100
        </span>
      </div>
    </div>
  )
}
