import { createSlice } from '@reduxjs/toolkit'

export const MaintenanceReducer = createSlice({
  name: 'maintenance',
  initialState: false,
  reducers: {
    updateMaintenance: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { updateMaintenance } = MaintenanceReducer.actions

export default MaintenanceReducer.reducer
