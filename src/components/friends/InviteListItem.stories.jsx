import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { InviteListItem } from '@components'
import AppReducer from '@slices/AppSlice'

export default {
  title: 'Friends/Invites/InviteListItem',
  component: InviteListItem,
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'in_game', 'teaming', 'queued'],
    },
    username: { control: 'text' },
  },
  args: {
    avatar:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    status: 'online',
    username: 'Username',
  },
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/lobbies/invites/:invite_id/',
        method: 'DELETE',
        status: 200,
        response: {},
      },
    ],
  },
}

const app = {
  toasts: [],
  friendListOpen: false,
}

const store = configureStore({
  reducer: {
    app: AppReducer,
  },
  preloadedState: { app },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <InviteListItem {...props} />
    </Provider>
  ),
}
