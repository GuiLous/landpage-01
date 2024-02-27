'use client'

import { ComponentProps, Fragment, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { AVAILABLE_STATUS } from '@/constants'

import { getLeveName } from '@/utils'

import { PlayerRanking } from '@/functions'

import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { Player } from '@/store/matchStore'

import { Avatar, LevelBadge, MenuContext } from '@/components/shared'

import { useAuth } from '@/hooks'

import { FieldsTableType } from './RankingTableHeader'

interface RankingTableRowProps extends ComponentProps<'tr'> {
  player: PlayerRanking
  selectedPlayer: Player | null
  fieldsColumn: FieldsTableType[]
  isLastRow?: boolean
  setSelectedPlayer: (state: Player | null) => void
}

export function RankingTableRow({
  player,
  selectedPlayer,
  setSelectedPlayer,
  fieldsColumn,
  isLastRow = false,
  ...props
}: RankingTableRowProps) {
  const { lobby } = useLobbyStore()
  const { invites } = useInvitesStore()

  const auth = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const bgUserGradient =
    'linear-gradient(0deg, rgba(104, 71, 255, 0.30) 0%, rgba(104, 71, 255, 0.30) 100%), #333'

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

  const win_rate =
    player.matches_played !== 0
      ? (player.matches_won / player.matches_played) * 100
      : 0

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
        'cursor-pointer bg-gray-1100 border-b border-b-gray-300/30',
        'last:border-0',
        player.user_id !== Number(auth?.id) &&
          'hover:bg-gradient_match_table_hover',
        isLastRow && 'rounded-b overflow-hidden'
      )}
      style={{
        background: player.user_id === Number(auth?.id) ? bgUserGradient : '',
      }}
      {...props}
    >
      {fieldsColumn.map((field, index) => (
        <Fragment key={index}>
          {field.stat === 'Nome de usuário' && (
            <td className={twMerge('max-w-[300px] py-3 text-left')}>
              <div className={twMerge('items-center gap-4', '3xl:gap-3')}>
                <Avatar
                  avatarUrl={player.avatar.medium}
                  alt="User profile"
                  size="sm"
                />

                <span
                  className={twMerge(
                    'max-w-[150px] text-sm leading-none truncate',
                    'ultrawide:text-lg ultrawide:leading-none'
                  )}
                >
                  {player.username}
                </span>

                <div className="relative max-w-fit flex-initial">
                  {selectedPlayer &&
                    player.username === selectedPlayer.username && (
                      <MenuContext open={isMenuOpen} onOpenChange={onCloseMenu}>
                        <MenuContext.Trigger className="invisible absolute" />

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
              </div>
            </td>
          )}

          {field.stat === 'Rank' && (
            <td
              className={twMerge(
                'border-0 py-3 text-left text-sm leading-none',
                'ultrawide:text-lg ultrawide:leading-none',
                index === 0 && 'pl-8'
              )}
            >
              <div className="items-center gap-3">
                <LevelBadge level={player.level} variant="sm" hideLevel />

                <span className="text-sm leading-none">
                  {getLeveName(player.level)}
                </span>
              </div>
            </td>
          )}

          {field.stat !== 'Nome de usuário' && field.stat !== 'Rank' && (
            <td
              className={twMerge(
                'border-0 py-3 text-left text-sm leading-none',
                'ultrawide:text-lg ultrawide:leading-none',
                index === 0 && 'pl-8 rounded-bl',
                index === 5 && 'rounded-br'
              )}
            >
              {field.stat === 'Posição' && player.ranking_pos}
              {field.stat === 'Level' && player.level}
              {field.stat === 'Win Rate' && `${Math.round(win_rate)}%`}
              {field.stat === 'KDA' && (player.stats.kda || '0.00')}
            </td>
          )}
        </Fragment>
      ))}
    </tr>
  )
}
