import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import lobbySlice, { Lobby } from '@/store/slices/lobbySlice'

import { LineupPlayerCard } from './LineupPlayerCard'

export default {
  title: 'Lineup/LineupPlayerCard',
  component: LineupPlayerCard,
  argTypes: {
    closeLabel: { control: 'text' },
    onClose: { control: 'boolean' },
  },
  args: {
    closeLabel: 'Fechar',
    onClose: false,
  },
}

const player = {
  avatar: {
    large:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
  },
  isLobbyOwner: false,
  username: 'User 1',
  steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
  user_id: 1,
  latest_matches_results: ['V', 'D'],
  matches_played: 2,
  level: 0,
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
        card: null,
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
      lobby: lobbySlice,
    },
    preloadedState: { lobby },
  })

  return (
    <div className="h-screen">
      <Provider store={store}>
        <LineupPlayerCard
          player={player}
          onClose={() => console.log('')}
          {...props}
        />
      </Provider>
    </div>
  )
}
