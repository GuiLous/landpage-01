import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload
      return state
    },

    updateFriend: (state, action) => {
      const updatedItems = state.account.friends.map((friend) =>
        friend.id === action.payload.id ? action.payload : friend
      )

      return {
        ...state,
        account: {
          ...state.account,
          friends: updatedItems,
        },
      }
    },

    addFriend: (state, action) => {
      const alreadyExists = state.account.friends.filter(
        (friend) => friend.id === action.payload.id
      )
      if (alreadyExists.length > 0) return state

      return {
        ...state,
        account: {
          ...state.account,
          friends: [...state.account.friends, action.payload],
        },
      }
    },

    updateLobby: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: action.payload,
        },
      }
    },

    updateLobbyId: (state, action) => {
      return { ...state, lobby_id: action.payload }
    },

    addInviteSent: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby_invites_sent: [
            ...state.account.lobby_invites_sent,
            action.payload,
          ],
        },
      }
    },

    addInviteReceived: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby_invites: [...state.account.lobby_invites, action.payload],
        },
      }
    },

    removeInvite: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby_invites: state.account.lobby_invites.filter(
            (invite) => invite.id !== action.payload.id
          ),
          lobby_invites_sent: state.account.lobby_invites_sent.filter(
            (invite) => invite.id !== action.payload.id
          ),
        },
      }
    },

    updateInviteReceived: (state, action) => {
      const updatedItems = state.account.lobby_invites.map((invite) =>
        invite.id === action.payload.id ? action.payload : invite
      )

      return {
        ...state,
        account: {
          ...state.account,
          lobby_invites: updatedItems,
        },
      }
    },

    restartQueue: (state) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: {
            ...state.account.lobby,
            restart: true,
          },
        },
      }
    },

    removeRestartQueue: (state) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: {
            ...state.account.lobby,
            restart: false,
          },
        },
      }
    },
  },
})

export const {
  updateUser,
  updateFriend,
  addFriend,
  updateLobby,
  addInviteReceived,
  removeInvite,
  updateInviteReceived,
  addInviteSent,
  restartQueue,
  removeRestartQueue,
  updateLobbyId,
} = UserReducer.actions

export default UserReducer.reducer
