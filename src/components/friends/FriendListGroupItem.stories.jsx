import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { FriendListGroupItem } from '@components'
import InviteReducer, { addInvite, deleteInvite } from '@slices/InviteSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Friends/FriendListGroupItem',
  component: FriendListGroupItem,
  argTypes: {
    user_id: { control: 'number' },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'in_game', 'teaming', 'queued'],
    },
    username: { control: 'text' },
    avatar: { control: 'text' },
    invited: { control: 'boolean' },
  },
  args: {
    invited: false,
    user_id: 2,
    status: 'online',
    username: 'Username',
    lobby_id: 2,
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
  },
}

const user = {
  id: 1,
  account: {
    lobby_id: 1,
  },
}

const invites = []

const store = configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
  },
  preloadedState: { user, invites },
})

export const Default = {
  render: (props) => {
    const invite = {
      id: '1:2',
      lobby_id: 1,
      from_player: { user_id: 1 },
      to_player: { user_id: 2 },
    }

    if (props.invited) store.dispatch(addInvite(invite))
    else store.dispatch(deleteInvite(invite))

    return (
      <Provider store={store}>
        <FriendListGroupItem {...props} />
      </Provider>
    )
  },
}
