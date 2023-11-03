import { DateTime } from 'luxon'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToHour } from '@/utils'

import { GameType } from '@/functions'

import { MatchStatus } from '@/store/slices/matchSlice'

import { Timer, Tooltip } from '@/components/shared'

interface ProfileMatchStatsLinkMapInfoProps {
  map_image?: string
  map_name?: string
  isLink: boolean
  game_type: GameType
  status?: MatchStatus
  start_date?: string
  end_date?: string
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
  let startDate = DateTime.now()

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
        src={map_image || ''}
        alt={`imagem do mapa ${map_name}`}
        width={54}
        height={54}
        className={twMerge(
          isLink && 'rounded h-auto object-cover img_link:hidden'
        )}
      />

      <div className="flex-col justify-between gap-2">
        <span className="font-medium leading-none text-white">
          {map_name || 'Nome do mapa'}
        </span>

        <div className="max-w-fit flex-initial flex-col gap-1">
          <span className="text-xs leading-none text-gray-300">
            {type_map[game_type]}
          </span>

          <Tooltip content="Duração da partida">
            <span className="text-xs leading-none text-gray-300">
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
