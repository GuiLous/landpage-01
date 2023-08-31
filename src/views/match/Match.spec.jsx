import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, useParams } from 'react-router-dom'

import { MatchesAPI } from '@api'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import MatchReducer from '@slices/MatchSlice'
import { MatchView } from '@views'

jest.mock('@api', () => ({
  MatchesAPI: {
    detail: jest.fn(),
  },
}))

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}))

const fakeResponse = {
  id: 1,
  status: 'finished',
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
      score: 1,
      players: [
        {
          id: 1,
          match_id: 0,
          team_id: 0,
          user_id: 1,
          username: 'player1',
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
  winner_id: 1,
}

let match = null

const invites = [{ to_player: { user_id: null } }]

const lobby = {
  queue: null,
  invited_players_ids: [],
  players_ids: [],
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      match: MatchReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { match, invites, lobby },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <MatchView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Match View', () => {
  beforeEach(() => {
    MatchesAPI.detail.mockResolvedValue(fakeResponse)
    useParams.mockReturnValue({ matchId: '1', username: 'player1' })
  })

  it('should render correctly', async () => {
    renderComponent()

    await waitFor(() => expect(MatchesAPI.detail).toHaveBeenCalled())
    await screen.findByText('Partida')
    expect(screen.getByText('Finalizada')).toBeInTheDocument()
    expect(screen.getByText('Ranqueada')).toBeInTheDocument()
    expect(screen.getByText('Auditorio')).toBeInTheDocument()
    expect(screen.getByText('Voltar')).toBeInTheDocument()
  })

  it('should redirect to /404 if response has errorMsg', async () => {
    MatchesAPI.detail.mockResolvedValue({ errorMsg: true })
    renderComponent()

    await waitFor(() => expect(MatchesAPI.detail).toHaveBeenCalled())
    expect(mockNavigate).toHaveBeenCalledWith('/404')
  })

  it('should redirect to /jogar if player is on match and match status is cancelled', async () => {
    fakeResponse.status = 'running'
    MatchesAPI.detail.mockResolvedValue(fakeResponse)
    match = {
      status: 'cancelled',
    }

    renderComponent()

    await waitFor(() => expect(MatchesAPI.detail).toHaveBeenCalled())
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/jogar'))
  })
})
