import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Container, FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Friends/FriendList',
  component: FriendList,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  args: {
    isOpen: true,
  },
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/lobbies/invites/',
        method: 'POST',
        status: 200,
        response: {
          id: '1:2',
          lobby_id: 1,
          to_player: { user_id: 2 },
          from_player: { user_id: 1 },
        },
      },
    ],
  },
}

const user = {
  id: 1,
  lobby_id: 1,
}

const friends = {
  online: [
    {
      user_id: 2,
      status: 'online',
      username: 'Amigo 2',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 2,
    },
    {
      user_id: 4,
      status: 'online',
      username: 'Amigo 4',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 4,
    },
    {
      user_id: 5,
      status: 'online',
      username: 'Amigo 5',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 5,
    },
    {
      user_id: 6,
      status: 'online',
      username: 'Amigo 6',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 6,
    },
    {
      user_id: 7,
      status: 'online',
      username: 'Amigo 7',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 7,
    },
    {
      user_id: 8,
      status: 'online',
      username: 'Amigo 8',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 8,
    },
    {
      user_id: 9,
      status: 'online',
      username: 'Amigo 9',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 9,
    },
    {
      user_id: 10,
      status: 'online',
      username: 'Amigo 10',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 10,
    },
    {
      user_id: 11,
      status: 'online',
      username: 'Amigo 11',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 11,
    },
    {
      user_id: 12,
      status: 'online',
      username: 'Amigo 12',
      avatar:
        'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      lobby_id: 12,
    },
    {
      user_id: 13,
      status: 'online',
      username: 'Amigo 13',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 13,
    },
  ],
  offline: [
    {
      user_id: 3,
      status: 'offline',
      username: 'Amigo 3',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      lobby_id: 3,
    },
  ],
}

const invites = [
  {
    id: '12:1',
    from_player: {
      user_id: 12,
      avatar: {
        medium:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      status: 'online',
      username: `Amigo 12`,
    },
    to_player: {
      user_id: 1,
      avatar: {
        medium:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      status: 'online',
      username: `User 1`,
    },
  },
]

const lobby = {
  id: 1,
  players: [
    {
      user_id: 1,
    },
  ],
  invited_players_ids: [],
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    friends: FriendReducer,
    invites: InviteReducer,
    lobby: LobbyReducer,
  },
  preloadedState: { user, friends, invites, lobby },
})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={store}>
        <Container style={{ height: '100vh' }} column>
          <FriendList {...props} />
        </Container>
      </Provider>
    </BrowserRouter>
  ),
}
