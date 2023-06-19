import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { ChangeEmailCard } from '@components'
import UserReducer from '@slices/UserSlice'

const fakeResponse = {
  id: 1,
  email: 'userUpdate@example.com',
  is_active: true,
  account: {
    steamid: 'string',
    username: 'string',
    level: 0,
    level_points: 0,
    is_verified: false,
    avatar: {},
    lobby_id: 1,
    pre_match: {
      id: 'string',
      state: 'string',
      countdown: 0,
      players_ready_count: 0,
      players_total: 0,
      user_ready: false,
    },
    steam_url: 'string',
    match: {
      id: 0,
      create_date: 'string',
      start_date: 'string',
      end_date: 'string',
      status: 'string',
      game_type: 'string',
      game_mode: 0,
      server_ip: 'string',
      teams: [
        {
          id: 0,
          name: 'string',
          score: 0,
          players: [
            {
              id: 0,
              match_id: 0,
              team_id: 0,
              user_id: 0,
              username: 'string',
              avatar: {},
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
                clutch_v1: 0,
                clutch_v2: 0,
                clutch_v3: 0,
                clutch_v4: 0,
                clutch_v5: 0,
                firstkills: 0,
                shots_fired: 0,
                head_shots: 0,
                chest_shots: 0,
                other_shots: 0,
                rounds_played: 0,
                clutches: 0,
                shots_hit: 0,
                adr: 0,
                kdr: 0,
                kda: 0,
                ahk: 0,
                ahr: 0,
                accuracy: 0,
                head_accuracy: 0,
                chest_accuracy: 0,
                others_accuracy: 0,
              },
              progress: {
                level_before: 0,
                level_after: 0,
                level_points_before: 0,
                level_points_after: 0,
                points_earned: 0,
              },
            },
          ],
          match_id: 0,
        },
      ],
      rounds: 0,
      winner_id: 0,
    },
    matches_played: 0,
    latest_matches_results: ['string'],
  },
  is_online: true,
  status: 'string',
}

export default {
  title: 'Account/ChangeEmailCard',
  component: ChangeEmailCard,
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/accounts/update-email/',
        method: 'PATCH',
        status: 200,
        response: fakeResponse,
      },
    ],
  },
}

const user = {
  id: 1,
  email: 'email@example.com',
  account: {
    is_verified: false,
  },
}

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  preloadedState: { user },
})

export const Default = {
  render: (props) => (
    <Provider store={store}>
      <ChangeEmailCard {...props} />
    </Provider>
  ),
}
