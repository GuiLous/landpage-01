import { createSlice } from '@reduxjs/toolkit'

import { Lobby, Player } from './lobbySlice'

export type InviteElement = {
  from_id: number
  to_id: number
  lobby_id: number
}

export type Invite = {
  id: string
  lobby_id: number
  lobby: Lobby
  from_player: Player
  to_player: Player
  create_date: Date
}

type InviteState = {
  invites: Invite[]
}

const initialState: InviteState = {
  invites: [],
}

export const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    initInvites: (_, action) => {
      return { invites: action.payload }
    },

    addInvite: (state, action) => {
      return { invites: [...state.invites, action.payload] }
    },

    deleteInvite: (state, action) => {
      return {
        invites: [
          ...state.invites.filter((invite) => invite.id !== action.payload.id),
        ],
      }
    },
  },
})

export const { addInvite, initInvites, deleteInvite } = inviteSlice.actions

export default inviteSlice.reducer
