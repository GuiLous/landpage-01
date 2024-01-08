import { BsFillFlagFill } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'

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
          <CustomIcon icon={FiClock} />
        ) : (
          <CustomIcon icon={BsFillFlagFill} />
        )}

        <div className="gap-1">
          <h2 className="text-lg uppercase leading-none">Partida</h2>
          <span className="text-lg font-bold uppercase leading-none">
            {statusMap[status]}
          </span>
        </div>
      </div>

      <MatchDetailsHeaderIp server_ip={server_ip} status={status} />
    </div>
  )
}
