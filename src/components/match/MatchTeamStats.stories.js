import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import UserReducer from '@slices/UserSlice'
import MatchTeamStats from './MatchTeamStats'

export default {
  title: 'Match/MatchTeamStats',
  component: MatchTeamStats,
  argTypes: {
    team: { control: 'object' },
    isWinning: { control: 'boolean' },
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
          username: 'Username',
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
          },
        },
        {
          id: 2,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 2,
          username: 'Username',
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
          },
        },
        {
          id: 3,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 3,
          username: 'Username',
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
          },
        },
        {
          id: 4,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 4,
          username: 'Username',
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
          },
        },
        {
          id: 5,
          level: 0,
          level_points: 0,
          match_id: 0,
          team_id: 0,
          user_id: 5,
          username: 'Username',
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
          },
        },
      ],
      match_id: 0,
    },
    isWinning: false,
  },
}

const user = {
  id: 1,
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
      <MatchTeamStats {...props} />
    </Provider>
  ),
}
