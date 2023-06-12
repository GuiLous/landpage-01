import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { InviteListGroup } from '@components'
import AppReducer from '@slices/AppSlice'

export default {
  title: 'friends/invites/InviteListGroup',
  component: InviteListGroup,
  argTypes: {
    title: { control: 'text' },
    collapse: { control: 'boolean' },
    open: { control: 'boolean' },
    invitesCount: { control: 'number' },
    unread: { control: 'boolean' },
  },
  args: {
    title: 'Convites',
    collapse: true,
    open: false,
    invitesCount: 0,
    unread: false,
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
  render: (props) => {
    const genItems = Array.from(Array(props.invitesCount).keys()).map(
      (friend, index) => ({
        id: `${index + 100}:1`,
        from_player: {
          avatar: {
            medium:
              'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          },
          status: 'online',
          username: `User${index + 100}`,
        },
      })
    )

    return (
      <Provider store={store}>
        <InviteListGroup items={genItems} {...props} />
      </Provider>
    )
  },
}
