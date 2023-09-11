import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchTeamStats } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

const data = {
  id: 0,
  name: 'OsKaravelhos',
  score: 0,
  players: [
    {
      id: 1,
      level: 10,
      level_points: 40,
      match_id: 0,
      team_id: 0,
      user_id: 1,
      username: 'GuiLous',
      avatar: {},
      points_earned: 30,
      stats: {
        kills: 8,
        deaths: 3,
        assists: 6,
        damage: 358,
        hs_kills: 5,
        afk: 2,
        plants: 3,
        defuses: 6,
        double_kills: 4,
        triple_kills: 2,
        quadra_kills: 1,
        aces: 1,
        firstkills: 6,
        shots_fired: 500,
        head_shots: 5,
        chest_shots: 200,
        other_shots: 195,
        kdr: 0,
        adr: 0,
        head_accuracy: 10,
      },
      status: 'online',
      steam_url: 'https://steamcommunity.com/profiles/783276758063212485',
      lobby_id: 2,
    },
  ],
  match_id: 0,
}

const renderComponent = (isWinning = true, isSameScore = true) => {
  const user = {
    id: 1,
    lobby_id: 2,
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

  render(
    <BrowserRouter>
      <Provider store={store}>
        <MatchTeamStats
          team={data}
          isWinning={isWinning}
          isSameScore={isSameScore}
          userId={1}
        />
      </Provider>
    </BrowserRouter>
  )
}

describe('MatchTeamStats Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('should render team data', () => {
    renderComponent()

    expect(screen.getByText('Time OsKaravelhos')).toBeInTheDocument()
    expect(screen.getByText('GuiLous')).toBeInTheDocument()
  })

  it('should navigate on click row if player.user_id is equal to user.id', async () => {
    renderComponent()

    const row = screen.getByTestId('row')
    fireEvent.click(row)

    await waitFor(() =>
      expect(mockUseNavigate).toHaveBeenCalledWith('/perfil/1')
    )
  })

  it('should open menu options on click row if player.user_id is not equal to user.id', async () => {
    data.players[0].user_id = 3
    renderComponent()

    const row = screen.getByTestId('row')
    fireEvent.click(row)

    await screen.findByText('Convidar para o grupo')
  })
})
