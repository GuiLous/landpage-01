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

export const useInvitesStore = create<InvitesStore>((set) => ({
  invites: [],
  initInvites: (invites) => set({ invites }),
  addInvite: (invite) =>
    set((state) => ({ invites: [...state.invites, invite] })),
  deleteInvite: (inviteId) =>
    set((state) => ({
      invites: [...state.invites.filter((invite) => invite.id !== inviteId)],
    })),
}))
