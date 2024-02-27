import { BsFillFlagFill } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

import { MatchStatus } from '@/store/matchStore'

import { CustomIcon } from '@/components/shared'

import { MatchDetailsHeaderIp } from './MatchDetailsHeaderIp'

const statusMap = {
  loading: 'Configurando',
  running: 'Em andamento',
  finished: 'Finalizada',
  cancelled: 'Cancelada',
  warmup: 'Em Aquecimento',
}

interface MatchDetailsHeaderStatusProps {
  status: MatchStatus
  server_ip: string
}

export function MatchDetailsHeaderStatus({
  status,
  server_ip,
}: MatchDetailsHeaderStatusProps) {
  return (
    <div className="max-w-fit flex-initial items-center gap-4">
      <div className="max-w-fit flex-initial items-center gap-3">
        {status === 'running' ? (
          <CustomIcon icon={FiClock} className="ultrawide:text-3xl" />
        ) : (
          <CustomIcon icon={BsFillFlagFill} className="ultrawide:text-3xl" />
        )}

        <div className="gap-1">
          <h2
            className={twMerge(
              'text-lg uppercase',
              'leading-none',
              'ultrawide:text-4xl ultrawide:leading-none'
            )}
          >
            Partida
          </h2>
          <span
            className={twMerge(
              'text-lg font-bold uppercase',
              'leading-none',
              'ultrawide:text-4xl ultrawide:leading-none'
            )}
          >
            {statusMap[status]}
          </span>
        </div>
      </div>

      <MatchDetailsHeaderIp server_ip={server_ip} status={status} />
    </div>
  )
}
