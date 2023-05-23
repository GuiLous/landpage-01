/* eslint-disable no-sequences */
import { DateTime } from 'luxon'

import { MatchHistoryList } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Profile/MatchHistoryList',
  component: MatchHistoryList,
  argTypes: {
    user: { control: 'object' },
    total_matches: { control: 'number' },
    matchesCount: { control: 'number' },
  },
  args: {
    total_matches: 100,
    matchesCount: 1,
    user: {
      id: 1,
      status: 'online',
      account: {
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        },
      },
    },
  },
}

export const Default = {
  render: (props) => {
    const currentDate = DateTime.local()

    const genMatches = Array.from(Array(props.matchesCount).keys()).map(
      (_, index) => ({
        id: index,
        teams: [
          {
            id: 10,
            score: 13,
            players: [
              {
                user_id: 1,
                points_earned: 20,
                stats: {
                  kills: 10,
                  deaths: 5,
                  assists: 3,
                  damage: 500,
                  head_shots: 15,
                  chest_shots: 20,
                  other_shots: 40,
                  firstkills: 2,
                },
              },
            ],
          },
          {
            id: 11,
            score: 10,
            players: [
              {
                user_id: 2,
                points_earned: -10,
                stats: {
                  kills: 15,
                  deaths: 10,
                  assists: 1,
                  damage: 700,
                  head_shots: 20,
                  chest_shots: 40,
                  other_shots: 50,
                  firstkills: 5,
                },
              },
            ],
          },
        ],
        winner_id: 10,
        rounds: 15,
        start_date: currentDate.minus({ days: index }).toISO(),
        end_date: currentDate.minus({ days: index }).toISO(),
        map_name: 'Inferno',
      })
    )

    return (
      <BrowserRouter>
        <MatchHistoryList {...props} matches={genMatches} />
      </BrowserRouter>
    )
  },
}
