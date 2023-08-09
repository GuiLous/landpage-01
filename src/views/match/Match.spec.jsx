import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import MatchReducer from '@slices/MatchSlice'
import UserReducer from '@slices/UserSlice'
import { MatchView } from '@views'

const fakeResponse = {
  id: 0,
  status: 'loading',
  map: {
    name: 'Auditorio',
  },
  game_type: 'competitive',
  game_mode: 1,
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  teams: [
    {
      id: 1,
      name: 'Team 1',
      score: 0,
      players: [
        {
          id: 1,
          match_id: 0,
          team_id: 0,
          user_id: 1,
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
          level: 0,
        },
      ],
      match_id: 0,
    },
    {
      id: 2,
      name: 'Team 2',
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
          level: 0,
        },
      ],
      match_id: 0,
    },
  ],
  rounds: 0,
  winner_id: 0,
}

const server = setupServer(
  rest.get('http://localhost:8000/api/matches/undefined/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeResponse))
  })
)

describe('MatchView Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  const user = {
    id: 1,
  }

  const match = {
    id: 1,
  }

  const invites = [{ to_player: { user_id: null } }]

  const lobby = {
    queue: null,
    invited_players_ids: [],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      match: MatchReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, match, invites, lobby },
  })

  it('should render correctly', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchView />
        </Provider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Partida')).toBeInTheDocument()
    })
    expect(screen.getByText('Configurando')).toBeInTheDocument()
    expect(screen.getByText('Ranked 1x1')).toBeInTheDocument()
    expect(screen.getByText('Auditorio')).toBeInTheDocument()
    expect(screen.getAllByText('Time Team 2')).toHaveLength(2)
  })
})
