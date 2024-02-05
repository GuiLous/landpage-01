'use client'

import { ComponentProps, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { AVAILABLE_STATUS } from '@/constants'

import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { Player } from '@/store/matchStore'

import { Avatar, MenuContext } from '@/components/shared'

type StatsType =
  | 'kills'
  | 'deaths'
  | 'assists'
  | 'head_shots'
  | 'head_accuracy'
  | 'plants'
  | 'defuses'
  | 'firstkills'
  | 'kdr'
  | 'adr'
  | 'double_kills'
  | 'triple_kills'
  | 'quadra_kills'
  | 'aces'

const playerStats = [
  'kills',
  'deaths',
  'assists',
  'head_shots',
  'head_accuracy',
  'plants',
  'defuses',
  'firstkills',
  'kdr',
  'adr',
  'double_kills',
  'triple_kills',
  'quadra_kills',
  'aces',
] as StatsType[]

interface MatchStatsTableRowProps extends ComponentProps<'tr'> {
  player: Player
  userId: number
  selectedPlayer: Player | null
  setSelectedPlayer: (state: Player | null) => void
}

export function MatchStatsTableRow({
  player,
  userId,
  selectedPlayer,
  setSelectedPlayer,
  ...props
}: MatchStatsTableRowProps) {
  const { lobby } = useLobbyStore()
  const { invites } = useInvitesStore()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const alreadyInvitedByFriend = !!lobby?.invited_players_ids.some(
    (id) => id === selectedPlayer?.user_id
  )

  const alreadyInvited =
    invites.filter(
      (invite) => invite.to_player.user_id === selectedPlayer?.user_id
    ).length > 0 || alreadyInvitedByFriend

  const alreadyOnTeam = selectedPlayer
    ? !!lobby?.players_ids.includes(selectedPlayer.user_id)
    : false

  const isAvailable = selectedPlayer
    ? !alreadyOnTeam &&
      AVAILABLE_STATUS.includes(selectedPlayer.status) &&
      !lobby?.queue
    : false

  const onCloseMenu = () => {
    setSelectedPlayer(null)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (selectedPlayer) {
      setIsMenuOpen(true)
    }
  }, [selectedPlayer])

  return (
    <tr
      className={twMerge(
        'cursor-pointer',
        'last:border-0',
        player.user_id !== Number(userId) &&
          'hover:bg-gradient_match_table_hover'
      )}
      style={{
        background:
          player.user_id === Number(userId)
            ? 'linear-gradient(90deg, rgba(104, 71, 255, 0.5) 0%, rgba(104, 71, 255, 0.19) 4.94%, rgba(104, 71, 255, 0) 13.92%),  rgba(51, 51, 51, 0.8)'
            : '',
      }}
      {...props}
    >
      <td
        className={twMerge(
          'border-0 max-w-[300px] px-3.5 py-3 text-left font-medium',
          '3xl:px-3'
        )}
      >
        <div className={twMerge('items-center gap-5', '3xl:gap-4')}>
          <div className="max-w-fit flex-initial">
            <Avatar
              avatarUrl={player.avatar?.medium}
              alt="User profile"
              size="sm"
              className="border border-purple-400"
            />
          </div>

          <div className="max-w-fit flex-initial flex-col">
            <span
              className={twMerge(
                'font-medium max-w-[150px] truncate',
                '3xl:text-sm',
                'ultrawide:text-2xl'
              )}
            >
              {player.username}
            </span>
          </div>

          {selectedPlayer && player.username === selectedPlayer.username && (
            <MenuContext open={isMenuOpen} onOpenChange={onCloseMenu}>
              <MenuContext.Trigger className="invisible" />

              <MenuContext.Content
                side="right"
                alreadyInvited={alreadyInvited}
                alreadyOnTeam={alreadyOnTeam}
                isAvailable={isAvailable}
                steam_url={selectedPlayer.steam_url}
                user_id={selectedPlayer.user_id}
                username={selectedPlayer.username}
              />
            </MenuContext>
          )}
        </div>
      </td>

      {playerStats.map((stat) => (
        <td
          key={stat}
          className={twMerge(
            'border-0 px-3.5 py-3 text-center font-medium',
            '3xl:px-3',
            'ultrawide:text-2xl'
          )}
        >
          {stat === 'head_accuracy'
            ? `${Math.ceil(player.stats.head_accuracy || 0)}%`
            : player.stats[stat] || 0}
        </td>
      ))}
    </tr>
  )
}
