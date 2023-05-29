import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { Container, FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Sidebar/FriendList',
  component: FriendList,
  argTypes: {},
  args: {},
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
            },
            {
              id: 4,
              status: 'online',
              username: 'Amigo 4',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 5,
              status: 'online',
              username: 'Amigo 5',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 6,
              status: 'online',
              username: 'Amigo 6',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 7,
              status: 'online',
              username: 'Amigo 7',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 8,
              status: 'online',
              username: 'Amigo 8',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 9,
              status: 'online',
              username: 'Amigo 9',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 10,
              status: 'online',
              username: 'Amigo 10',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 11,
              status: 'online',
              username: 'Amigo 11',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 12,
              status: 'online',
              username: 'Amigo 12',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
            {
              id: 13,
              status: 'online',
              username: 'Amigo 13',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
          ],
          offline: [
            {
              id: 3,
              status: 'offline',
              username: 'Amigo 3',
              avatar:
                'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            },
          ],
        },
      },
      {
        url: 'http://localhost:8000/api/mm/lobby/1/invite-player/2/',
        method: 'POST',
        status: 200,
        response: {
          to_player: { id: 2 },
        },
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
  received: [],
  sent: [],
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
      <Container style={{ height: '90vh' }} column>
        <FriendList {...props} />
      </Container>
    </Provider>
  ),
}
