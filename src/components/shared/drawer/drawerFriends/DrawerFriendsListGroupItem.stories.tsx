import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import friendSlice from '@/store/slices/friendSlice'
import inviteSlice, { Invite } from '@/store/slices/inviteSlice'
import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { DrawerFriendsListGroupItem } from './DrawerFriendsListGroupItem'

const status = ['online', 'offline', 'queued', 'in_game', 'teaming', 'away']

export default {
  title: 'Friends/DrawerFriendsListGroupItem',
  component: DrawerFriendsListGroupItem,
  argTypes: {
    avatar: { control: 'text' },
    lobby_id: { control: 'number' },
    status: {
      options: status,
      type: 'select',
    },
    steam_url: { control: 'text' },
    user_id: { control: 'number' },
    username: { control: 'text' },
  },
  args: {
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    lobby_id: 1,
    status: 'online',
    steam_url: '',
    user_id: 1,
    username: 'User 1',
  },
}

export const Default = (props: any) => {
  const user: User = {
    id: 1,
    status: 'online',
    email: 'user@gmail.com',
    is_active: true,
    is_online: true,
    lobby_id: 1,
    match_id: null,
    pre_match_id: null,
    account: {
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        small: '',
        large: '',
      },
    },
  }

  const invites: Invite[] = []

  const lobby: Lobby = {
    id: 1,
    players: [],
    invited_players_ids: [],
    players_ids: [],
    owner_id: 1,
    queue: null,
    queue_time: null,
    restriction_countdown: null,
    seats: 4,
  }

  const store = configureStore({
    reducer: {
      user: userSlice,
      friends: friendSlice,
      invites: inviteSlice,
      lobby: lobbySlice,
    },
    preloadedState: {
      user: { user },
      invites: { invites },
      lobby,
    },
  })

  return (
    <Provider store={store}>
      <DrawerFriendsListGroupItem {...props} />
    </Provider>
  )
}
