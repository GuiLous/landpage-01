import zukeeper from 'zukeeper'
import { create } from 'zustand'

import { Lobby, Player } from './lobbyStore'

export type InviteElement = {
  from_id: number
  to_id: number
  lobby_id: number
}

export type Invite = {
  id: string
  lobby_id: number
  lobby?: Lobby
  from_player: Player
  to_player: Player
  create_date: Date
}

type InvitesStore = {
  invites: Invite[]
  initInvites: (invites: Invite[]) => void
  addInvite: (invite: Invite) => void
  deleteInvite: (inviteId: string) => void
}

export const useInvitesStore = create<InvitesStore>(
  zukeeper((set: any) => ({
    invites: [],
    initInvites: (invites: Invite[]) => set({ invites }),
    addInvite: (invite: Invite) =>
      set((state: InvitesStore) => ({ invites: [...state.invites, invite] })),
    deleteInvite: (inviteId: string) =>
      set((state: InvitesStore) => ({
        invites: [...state.invites.filter((invite) => invite.id !== inviteId)],
      })),
  }))
)
