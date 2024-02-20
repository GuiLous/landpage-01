'use client'

import { Friend } from '@/store/friendStore'

import { useAudio } from '@/hooks'

import { LineupCustomPlayerCard } from './LineupCustomPlayerCard'
import { LineupCustomPlayerCardContent } from './LineupCustomPlayerCardContent'
import { SideType } from './LineupCustomSide'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface LineupCustomRenderPlayersCardProps {
  players?: Friend[]
  side: SideType
  owner_id: number
}

export function LineupCustomRenderPlayersCard({
  players = [],
  side,
  owner_id,
}: LineupCustomRenderPlayersCardProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  return players.map((player) => (
    <LineupCustomPlayerCard
      key={player.user_id}
      player={player}
      side={side}
      isLobbyOwner={owner_id === player?.user_id}
      playSoundClick={playSoundClick}
      playSoundHover={playSoundHover}
    >
      <LineupCustomPlayerCardContent
        isLobbyOwner={owner_id === player?.user_id}
        player={player}
      />
    </LineupCustomPlayerCard>
  ))
}
