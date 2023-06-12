import { createSlice } from '@reduxjs/toolkit'

export const InviteReducer = createSlice({
  name: 'invite',
  initialState: {
    list: [],
    unreadCount: 0,
  },
  reducers: {
    initInvites: (state, action) => {
      return { ...state, list: action.payload }
    },

    newInvite: (state, action) => {
      return {
        list: [...state.list, action.payload],
        unreadCount: state.unreadCount + 1,
      }
    },

    deleteInvite: (state, action) => {
      return {
        ...state,
        list: [
          ...state.list.filter((invite) => invite.id === action.payload.id),
        ],
      }
    },

    readInvites: (state) => {
      return { ...state, unreadCount: 0 }
    },
  },
})

export const { newInvite, readInvites, initInvites, deleteInvite } =
  InviteReducer.actions

export default InviteReducer.reducer
