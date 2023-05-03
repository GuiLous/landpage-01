import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '@components'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Header/Header',
  component: Header,
}

const user = {
  account: {
    username: 'fakeUser',
    avatar: {
      small: 'fakeImg',
    },
    lobby: {
      queue: null,
    },
  },
}

const notifications = []

const match = {
  preMatch: null,
  match: null,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    match: MatchReducer,
    notifications: NotificationReducer,
  },
  preloadedState: { user, match, notifications },
})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={store}>
        <Header {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
