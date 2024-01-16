'use client'

import { AVAILABLE_STATUS } from '@/constants'

import { Friend } from '@/store/friendStore'
import { useInvitesStore } from '@/store/invitesStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useUserStore } from '@/store/userStore'

import { MenuContext } from '@/components/shared'

interface LineupMenuContextProps {
  player: Friend
  isMenuOpen: boolean
  setIsMenuOpen: (state: boolean) => void
  onClose?: false | (() => Promise<void>)
}

export function LineupMenuContext({
  player,
  isMenuOpen,
  setIsMenuOpen,
  onClose,
}: LineupMenuContextProps) {
  const user = useUserStore.getState().user
  const lobby = useLobbyStore.getState().lobby
  const invites = useInvitesStore.getState().invites

  const alreadyInvitedByFriend = !!lobby?.invited_players_ids.some(
    (id) => id === player?.user_id
  )

  const alreadyInvited =
    invites.filter((invite) => invite.to_player.user_id === player?.user_id)
      .length > 0 || alreadyInvitedByFriend

  const alreadyOnTeam = player
    ? !!lobby?.players_ids.includes(player.user_id)
    : false

  const isAvailable = player
    ? !alreadyOnTeam &&
      AVAILABLE_STATUS.includes(player.status) &&
      !lobby?.queue
    : false

  return (
    <MenuContext open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <MenuContext.Trigger className="invisible" />

      <MenuContext.Content
        side="bottom"
        alreadyInvited={alreadyInvited}
        alreadyOnTeam={alreadyOnTeam}
        isAvailable={isAvailable}
        steam_url={player.steam_url}
        user_id={player.user_id}
        username={player.username}
        isUser={player.user_id === user?.id}
        isLobbyOwner={lobby?.owner_id === user?.id}
        onClose={onClose}
        isOnLobby
      />
    </MenuContext>
  )
}
