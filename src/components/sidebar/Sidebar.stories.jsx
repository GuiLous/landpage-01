import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Container, Sidebar } from '@components'
import AppReducer from '@slices/AppSlice'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
  argTypes: {
    unreadInvites: { control: { type: 'range', min: 0 } },
    unreadNotifications: { control: { type: 'range', min: 0 } },
    collapsed: { control: 'boolean' },
    collapsable: { control: 'boolean' },
    userLevel: { control: { type: 'range', min: 0, max: 50 } },
    isInQueue: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
  },
  args: {
    unreadInvites: 0,
    unreadNotifications: 0,
    collapsed: true,
    collapsable: false,
    userLevel: 0,
    isInQueue: false,
    isInMatch: false,
    isRestricted: false,
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
    ],
  },
}

export const Default = {
  render: (props) => {
    const user = {
      id: 1,
      account: {
        level: props.userLevel,
        level_points: 56,
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        },
        username: 'Username',
        lobby: {
          queue: null,
          id: 1,
        },
      },
      status: 'online',
    }

    const lobby = {
      queue: props.isInQueue
        ? new Date().toISOString().replace('T', ' ').replace('Z', '')
        : null,
      queue_time: 300,
      restriction_countdown: props.isRestricted ? 300 : null,
      id: 1,
      players: [],
    }

    const invites = Array.from(Array(props.unreadInvites).keys()).map(
      (item, index) => ({
        to_player: { user_id: 1 },
        from_player: { user_id: index + 2 },
        id: `${index + 2}:1`,
        lobby_id: index + 2,
      })
    )

    const match = {
      preMatch: null,
      match: props.isInMatch,
    }
    const app = {
      toasts: [],
      friendListOpen: false,
    }

    const friends = {
      online: [],
      offline: [],
    }

    const notifications = Array.from(
      Array(props.unreadNotifications).keys()
    ).map((notification, index) => ({ id: index, read_date: null }))

    const store = configureStore({
      reducer: {
        user: UserReducer,
        notifications: NotificationReducer,
        invites: InviteReducer,
        match: MatchReducer,
        app: AppReducer,
        friends: FriendReducer,
        lobby: LobbyReducer,
      },
      preloadedState: {
        user,
        friends,
        notifications,
        invites,
        app,
        match,
        lobby,
      },
    })

    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container style={{ height: '100vh' }} column>
            <Sidebar {...props} />
          </Container>
        </Provider>
      </BrowserRouter>
    )
  },
}
