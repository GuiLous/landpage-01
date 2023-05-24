import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import InviteListItem from './InviteListItem'

import UserReducer from '@slices/UserSlice'

export default {
  title: 'User/InviteListItem',
  component: InviteListItem,
  argTypes: {
    id: { control: 'number' },
    status: {
      control: 'select',
      options: ['offline', 'online', 'away', 'queued', 'teaming', 'in_game'],
    },
    level: { control: { type: 'range', min: 0, max: 50 } },
    username: { control: 'text' },
  },
  args: {
    id: 1,
    status: 'online',
    level: 0,
    username: 'Username',
  },
}

const user = {
  account: {
    lobby_invites_sent: [],
    lobby: {
      queue: false,
    },
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
      <InviteListItem {...props} />
    </Provider>
  ),
}
