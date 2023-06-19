import { createSlice } from '@reduxjs/toolkit'

export const InviteReducer = createSlice({
  name: 'invite',
  initialState: [],
  reducers: {
    initInvites: (state, action) => {
      return action.payload
    },

    addInvite: (state, action) => {
      return [...state, action.payload]
    },

    deleteInvite: (state, action) => {
      return [...state.filter((invite) => invite.id !== action.payload.id)]
    },
  },
})

export const { addInvite, initInvites, deleteInvite } = InviteReducer.actions

export default InviteReducer.reducer
