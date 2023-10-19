import { configureStore } from '@reduxjs/toolkit'
import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import friendSlice, { Friend } from '@/store/slices/friendSlice'
import inviteSlice, { Invite } from '@/store/slices/inviteSlice'
import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { DrawerFriends } from './DrawerFriends'

export default {
  title: 'Friends/DrawerFriends',
  component: DrawerFriends,
  argTypes: {
    open: { control: { type: 'boolean' } },
    totalNotifications: { control: 'number' },
  },
  args: {
    open: false,
    totalNotifications: 0,
  },
} as Meta

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

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

  const friends = {
    online: [
      {
        user_id: 2,
        status: 'online',
        username: 'Amigo 2',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 4,
        status: 'online',
        username: 'Amigo 4',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 5,
        status: 'online',
        username: 'Amigo 5',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 6,
        status: 'online',
        username: 'Amigo 6',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 7,
        status: 'online',
        username: 'Amigo 7',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 8,
        status: 'online',
        username: 'Amigo 8',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 9,
        status: 'online',
        username: 'Amigo 9',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 10,
        status: 'online',
        username: 'Amigo 10',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 11,
        status: 'online',
        username: 'Amigo 11',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 12,
        status: 'online',
        username: 'Amigo 12',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
      {
        user_id: 13,
        status: 'online',
        username: 'Amigo 13',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
    ] as Friend[],
    offline: [
      {
        user_id: 3,
        status: 'offline',
        username: 'Amigo 3',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
      },
    ] as Friend[],
  }

  const invites: Invite[] = [
    {
      id: '12:1',
      from_player: {
        user_id: 12,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large: '',
          small: '',
        },
        latest_matches_results: ['D'],
        level: 1,
        matches_played: 1,
        steam_url: '',
        username: 'Amigo 12',
        status: 'online',
      },
      to_player: {
        user_id: 1,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
          large: '',
          small: '',
        },
        latest_matches_results: ['D'],
        level: 1,
        matches_played: 1,
        steam_url: '',
        username: 'User 1',
        status: 'online',
      },
      lobby_id: 2,
      create_date: new Date(),
    },
  ]

  const lobby: Lobby = {
    id: 1,
    players: [
      {
        user_id: 1,
        status: 'online',
        username: 'Amigo 2',
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          small: '',
          large: '',
        },
        level: 0,
        level_points: 0,
        steam_url: '',
        steamid: '',
        lobby_id: 1,
      },
    ],
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
      friends,
      invites: { invites },
      lobby,
    },
  })

  return (
    <Provider store={store}>
      <DrawerFriends open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
