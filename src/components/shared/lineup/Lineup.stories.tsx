import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'
import preMatchSlice, { PreMatch } from '@/store/slices/preMatchSlice'
import userSlice, { User } from '@/store/slices/userSlice'

import { Lineup } from './Lineup'

export default {
  title: 'Lineup/Lineup',
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
          medium: '',
          small: '',
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
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
    <div className="h-screen">
      <Provider store={store}>
        <Lineup {...props} />
      </Provider>
    </div>
  )
}
