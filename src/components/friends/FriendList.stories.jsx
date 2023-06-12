import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { Container, FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
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
        url: 'http://localhost:8000/api/friends/',
        method: 'GET',
        status: 200,
        response: {
          online: [
            {
              id: 2,
              status: 'online',
              username: 'Amigo 2',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 1,
              },
            },
            {
              id: 4,
              status: 'online',
              username: 'Amigo 4',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 2,
              },
            },
            {
              id: 5,
              status: 'online',
              username: 'Amigo 5',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 3,
              },
            },
            {
              id: 6,
              status: 'online',
              username: 'Amigo 6',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 4,
              },
            },
            {
              id: 7,
              status: 'online',
              username: 'Amigo 7',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 7,
              },
            },
            {
              id: 8,
              status: 'online',
              username: 'Amigo 8',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 1,
              },
            },
            {
              id: 9,
              status: 'online',
              username: 'Amigo 9',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 9,
              },
            },
            {
              id: 10,
              status: 'online',
              username: 'Amigo 10',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 10,
              },
            },
            {
              id: 11,
              status: 'online',
              username: 'Amigo 11',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 11,
              },
            },
            {
              id: 12,
              status: 'online',
              username: 'Amigo 12',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 12,
              },
            },
            {
              id: 13,
              status: 'online',
              username: 'Amigo 13',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 14,
              },
            },
          ],
          offline: [
            {
              id: 3,
              status: 'offline',
              username: 'Amigo 3',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
              lobby: {
                id: 1,
              },
            },
          ],
        },
      },
      {
        url: 'http://localhost:8000/api/lobbies/invites/',
        method: 'POST',
        status: 200,
        response: {
          to_player: { id: 2 },
        },
      },
      {
        url: 'http://localhost:8000/api/lobbies/invites/?received=true',
        method: 'GET',
        status: 200,
        response: [
          {
            id: '100:1',
            from_player: {
              avatar: {
                medium:
                  'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
              },
              status: 'online',
              username: `User 100`,
            },
          },
        ],
      },
    ],
  },
}

const user = {
  id: 1,
  account: {
    lobby: {
      id: 1,
      players_ids: [1],
      max_players: 5,
      player_count: 1,
    },
    lobby_invites: [],
    lobby_invites_sent: [],
  },
}

const friends = {
  online: [],
  offline: [],
}

const invites = {
  list: [],
  unread: 0,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    friends: FriendReducer,
    invites: InviteReducer,
  },
  preloadedState: { user, friends, invites },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <Container style={{ height: '100vh' }} column>
        <FriendList {...props} />
      </Container>
    </Provider>
  ),
}
