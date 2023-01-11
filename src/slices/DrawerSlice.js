import { createSlice } from '@reduxjs/toolkit'

export const DrawerReducer = createSlice({
  name: 'drawer',
  initialState: null,
  reducers: {
    toggleDrawer: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { toggleDrawer } = DrawerReducer.actions

export default DrawerReducer.reducer
