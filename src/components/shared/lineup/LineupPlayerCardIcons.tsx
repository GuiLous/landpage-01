import { FaUser } from 'react-icons/fa'
import { SiSteam } from 'react-icons/si'

import { Link, Tooltip } from '@/components/shared'

interface LineupPlayerCardIconsProps {
  user_id: number
  steam_url: string
}

export function LineupPlayerCardIcons({
  steam_url,
  user_id,
}: LineupPlayerCardIconsProps) {
  return (
    <div className="flex-initial justify-center gap-8 3xl:gap-6">
      <div className="max-w-fit flex-initial cursor-pointer">
        <Tooltip content="Ver perfil" asChild={false}>
          <Link href={`/perfil/${user_id}`}>
            <FaUser className="align-middle text-2xl text-white 3xl:text-lg" />
          </Link>
        </Tooltip>
      </div>

      <div className="max-w-fit flex-initial cursor-pointer">
        <Tooltip content="Visitar perfil na steam" asChild={false}>
          <Link href={steam_url} target="_blank">
            <SiSteam className="align-middle text-2xl text-white 3xl:text-lg" />
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}
