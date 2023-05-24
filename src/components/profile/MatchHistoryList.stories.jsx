/* eslint-disable no-sequences */
import { DateTime } from 'luxon'

import { MatchHistoryList } from '@components'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const currentDate = DateTime.local()

export default {
  title: 'Profile/MatchHistoryList',
  component: MatchHistoryList,
  argTypes: {
    user: { control: 'object' },
  },
  args: {
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
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/accounts/1/matches/',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 0,
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
            start_date: currentDate.minus({ days: 0 }).toISO(),
            end_date: currentDate.minus({ days: 0 }).toISO(),
            map_name: 'Inferno',
          },
          {
            id: 0,
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
            start_date: currentDate.minus({ days: 0 }).toISO(),
            end_date: currentDate.minus({ days: 0 }).toISO(),
            map_name: 'Inferno',
          },
        ],
      },
    ],
  },
}

const store = configureStore({
  reducer: {},
})

export const Default = {
  render: (props) => {
    // const genMatches = Array.from(Array(props.matchesCount).keys()).map(
    //   (_, index) => ({

    //   })
    // )

    return (
      <BrowserRouter>
        <Provider store={store}>
          <MatchHistoryList {...props} />
        </Provider>
      </BrowserRouter>
    )
  },
}
