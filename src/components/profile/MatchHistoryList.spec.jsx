import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { DateTime } from 'luxon'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'

import { MatchHistoryList } from '@components'
import { BrowserRouter } from 'react-router-dom'

const currentDate = DateTime.local()

const server = setupServer(
  rest.get('http://localhost:8000/api/accounts/1/matches/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
      ])
    )
  })
)

describe('MatchHistoryList Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const user = {
    id: 1,
    status: 'online',
    account: {
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
    },
  }

  const store = configureStore({
    reducer: {},
  })

  it('should render correctly', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchHistoryList user={user} />
        </Provider>
      </BrowserRouter>
    )

    await waitFor(() => {
      screen.getByText('Hoje')
    })

    expect(screen.getByText('Últimas Partidas')).toBeInTheDocument()
    expect(screen.getByText('Inferno')).toBeInTheDocument()
  })

  it('should render message when there is not matches', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchHistoryList user={user} />
        </Provider>
      </BrowserRouter>
    )

    expect(
      screen.getByText('Ops, você ainda não tem partidas.')
    ).toBeInTheDocument()
  })
})
