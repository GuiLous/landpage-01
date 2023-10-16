import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import preMatchSlice, { PreMatch } from '@/store/slices/preMatchSlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { LineupPlayBtn } from './LineupPlayBtn'

export default {
  title: 'Lineup/LineupPlayBtn',
  component: LineupPlayBtn,
  argTypes: {
    isOwner: { control: 'boolean' },
  },
  args: {
    isOwner: false,
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

  const preMatch: PreMatch | null = null

  const store = configureStore({
    reducer: {
      lobby: lobbySlice,
      user: userSlice,
      preMatch: preMatchSlice,
    },
    preloadedState: { lobby, user: { user }, preMatch: { preMatch } },
  })

  return (
    <Provider store={store}>
      <LineupPlayBtn {...props} />
    </Provider>
  )
}
