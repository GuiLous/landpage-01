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
  game_type: GameType
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
  game_type,
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
    <div className="gap-4">
      <Image
        src={
          map_image ||
          'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png'
        }
        alt={`imagem do mapa ${map_name}`}
        width={54}
        height={54}
        className={twMerge(
          'rounded h-auto object-cover ',
          isLink && 'img_link:hidden'
        )}
        sizes="100vw"
      />

      <div className="flex-col justify-between gap-2">
        <span className="font-medium leading-none text-white">
          {map_name || 'Nome do mapa'}
        </span>

        <div className="max-w-fit flex-initial flex-col gap-1">
          <span className={twMerge('text-xs text-gray-300', 'leading-none')}>
            {type_map[game_type]}
          </span>

          <Tooltip content="Duração da partida">
            <span
              className={twMerge(
                'whitespace-nowrap text-xs text-gray-300',
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
