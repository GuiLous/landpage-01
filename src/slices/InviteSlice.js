import { createSlice } from '@reduxjs/toolkit'

export const InviteReducer = createSlice({
  name: 'invite',
  initialState: {
    received: [],
    sent: [],
    unread: 0,
  },
  reducers: {
    newInvite: (state) => {
      return { ...state, unread: state.unread + 1 }
    },

    readInvites: (state) => {
      return { ...state, unread: 0 }
    },
  },
})

export const { newInvite, readInvites } = InviteReducer.actions

export default InviteReducer.reducer
