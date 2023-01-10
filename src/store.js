import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './slices/UserSlice'
import ToastReducer from './slices/ToastSlice'
import DrawerReducer from './slices/DrawerSlice'
import NotificationReducer from './slices/NotificationSlice'

export default configureStore({
	reducer: {
		user: UserReducer,
		toasts: ToastReducer,
		drawer: DrawerReducer,
		notifications: NotificationReducer,
	},
	devTools: true,
})
