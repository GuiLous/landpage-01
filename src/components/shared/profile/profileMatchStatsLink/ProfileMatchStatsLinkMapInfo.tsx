import { DateTime } from 'luxon'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToHour } from '@/utils'

import { GameType, MatchStatus } from '@/store/matchStore'

import { Timer, Tooltip } from '@/components/shared'

interface ProfileMatchStatsLinkMapInfoProps {
  map_image?: string
  map_name?: string
  isLink: boolean
  game_mode: GameType
  status?: MatchStatus
  start_date?: string
  end_date: string | null
}

const type_map = {
  competitive: 'Ranqueada',
  custom: 'Personalizada',
}

export function ProfileMatchStatsLinkMapInfo({
  isLink,
  map_image,
  map_name,
  game_mode,
  status,
  start_date,
  end_date,
}: ProfileMatchStatsLinkMapInfoProps) {
  let startDate: DateTime<true> | DateTime<false> = DateTime.now()

  startDate = start_date ? DateTime.fromISO(start_date) : startDate
  const endDate = end_date && DateTime.fromISO(end_date)

  let elapsedTime = Math.floor(
    endDate
      ? endDate.diff(startDate, 'seconds').seconds
      : DateTime.now().diff(startDate, 'seconds').seconds
  )

  elapsedTime = elapsedTime < 0 ? 0 : elapsedTime

  return (
    <div className={twMerge('gap-4', 'ultrawide:gap-7')}>
      <div
        className={twMerge(
          'relative flex-initial h-[54px] w-[54px]',
          'ultrawide:h-20 ultrawide:w-20'
        )}
      >
        <Image
          src={map_image || ''}
          alt={`imagem do mapa ${map_name}`}
          fill
          className={twMerge(
            'rounded h-auto object-cover ',
            isLink && 'img_link:hidden'
          )}
          quality={35}
          sizes="15vw"
        />
      </div>

      <div className="flex-col justify-between gap-2">
        <span
          className={twMerge(
            'font-medium leading-none text-white',
            'ultrawide:text-2xl ultrawide:leading-none'
          )}
        >
          {map_name}
        </span>

        <div className="max-w-fit flex-initial flex-col gap-1">
          <span
            className={twMerge(
              'text-xs text-gray-300',
              'ultrawide:text-xl ultrawide:leading-none',
              'leading-none'
            )}
          >
            {type_map[game_mode]}
          </span>

          <Tooltip content="Duração da partida">
            <span
              className={twMerge(
                'whitespace-nowrap text-xs text-gray-300',
                'ultrawide:text-xl ultrawide:leading-none',
                'leading-none'
              )}
            >
              {status !== 'warmup' && (
                <>
                  {!isLink && `${startDate.toFormat('dd/MM/yyyy')} - `}

                  {endDate ? (
                    formatSecondsToHour(elapsedTime)
                  ) : (
                    <Timer initialTime={elapsedTime} />
                  )}
                </>
              )}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
