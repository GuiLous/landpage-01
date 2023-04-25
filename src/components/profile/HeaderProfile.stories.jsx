import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import UserReducer from '@slices/UserSlice'
import HeaderProfile from './HeaderProfile'

export default {
  title: 'Profile/HeaderProfile',
  component: HeaderProfile,
  tags: ['autodocs'],
}

const user = {
  id: 1,
  account: {
    avatar: {
      medium: 'https://github.com/GuiLous',
    },
    username: 'GuiLous',
  },
}

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  preloadedState: { user },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <HeaderProfile {...props} />
    </Provider>
  ),
}
