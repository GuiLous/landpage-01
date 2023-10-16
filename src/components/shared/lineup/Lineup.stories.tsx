import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { Lineup } from './Lineup'

export default {
  title: 'Friends/Lineup',
  component: Lineup,
  argTypes: {
    isOwner: { control: 'number' },
  },
  args: {
    maxPlayers: 5,
  },
}

export const Default = (props: any) => {
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

  const store = configureStore({
    reducer: {
      lobby: lobbySlice,
      user: userSlice,
    },
    preloadedState: { lobby, user: { user } },
  })

  return (
    <Provider store={store}>
      <Lineup {...props} />
    </Provider>
  )
}
