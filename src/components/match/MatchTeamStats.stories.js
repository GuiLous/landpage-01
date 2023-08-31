import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchTeamStats } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Match/MatchTeamStats',
  component: MatchTeamStats,
  argTypes: {
    team: { control: 'object' },
    isWinning: { control: 'boolean' },
    isSameScore: { control: 'boolean' },
    userId: { control: 'number' },
  },
  args: {
    team: {
      id: 1,
      name: 'Time A',
      score: 0,
      players: [
        {
          id: 1,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 1,
          username: 'Username 1',
          avatar: {
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
          points_earned: 0,
          stats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            damage: 0,
            hs_kills: 0,
            afk: 0,
            plants: 0,
            defuses: 0,
            double_kills: 0,
            triple_kills: 0,
            quadra_kills: 0,
            aces: 0,
            firstkills: 0,
            shots_fired: 0,
            head_shots: 0,
            chest_shots: 0,
            other_shots: 0,
            kdr: 0,
            adr: 0,
            head_accuracy: 0,
          },
          status: 'online',
          steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
          lobby_id: 2,
        },
        {
          id: 2,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 2,
          username: 'Username 2',
          avatar: {
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
          points_earned: 0,
          stats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            damage: 0,
            hs_kills: 0,
            afk: 0,
            plants: 0,
            defuses: 0,
            double_kills: 0,
            triple_kills: 0,
            quadra_kills: 0,
            aces: 0,
            firstkills: 0,
            shots_fired: 0,
            head_shots: 0,
            chest_shots: 0,
            other_shots: 0,
            kdr: 0,
            adr: 0,
            head_accuracy: 0,
          },
          status: 'online',
          steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
          lobby_id: 2,
        },
        {
          id: 3,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 3,
          username: 'Username 3',
          avatar: {
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
          points_earned: 0,
          stats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            damage: 0,
            hs_kills: 0,
            afk: 0,
            plants: 0,
            defuses: 0,
            double_kills: 0,
            triple_kills: 0,
            quadra_kills: 0,
            aces: 0,
            firstkills: 0,
            shots_fired: 0,
            head_shots: 0,
            chest_shots: 0,
            other_shots: 0,
            kdr: 0,
            adr: 0,
            head_accuracy: 0,
          },
          status: 'online',
          steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
          lobby_id: 2,
        },
        {
          id: 4,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 4,
          username: 'Username 4',
          avatar: {
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
          points_earned: 0,
          stats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            damage: 0,
            hs_kills: 0,
            afk: 0,
            plants: 0,
            defuses: 0,
            double_kills: 0,
            triple_kills: 0,
            quadra_kills: 0,
            aces: 0,
            firstkills: 0,
            shots_fired: 0,
            head_shots: 0,
            chest_shots: 0,
            other_shots: 0,
            kdr: 0,
            adr: 0,
            head_accuracy: 0,
          },
          status: 'online',
          steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
          lobby_id: 2,
        },
        {
          id: 5,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 5,
          username: 'Username 5',
          avatar: {
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
          points_earned: 0,
          stats: {
            kills: 0,
            deaths: 0,
            assists: 0,
            damage: 0,
            hs_kills: 0,
            afk: 0,
            plants: 0,
            defuses: 0,
            double_kills: 0,
            triple_kills: 0,
            quadra_kills: 0,
            aces: 0,
            firstkills: 0,
            shots_fired: 0,
            head_shots: 0,
            chest_shots: 0,
            other_shots: 0,
            kdr: 0,
            adr: 0,
            head_accuracy: 0,
          },
          status: 'online',
          steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
          lobby_id: 2,
        },
      ],
      match_id: 0,
    },
    isWinning: false,
    userId: 1,
    isSameScore: false,
  },
}

const user = {
  id: 1,
  lobby_id: 1,
}

const invites = [{ to_player: { user_id: null } }]

const lobby = {
  queue: null,
  invited_players_ids: [],
  players_ids: [],
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    lobby: LobbyReducer,
  },
  preloadedState: { user, invites, lobby },
})

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Provider store={store}>
        <MatchTeamStats {...props} />
      </Provider>
    </BrowserRouter>
  ),
}
