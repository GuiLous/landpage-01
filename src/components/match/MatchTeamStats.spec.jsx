import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchTeamStats } from '@components'
import UserReducer from '@slices/UserSlice'

const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

const renderComponent = () => {
  const user = {
    id: 1,
  }

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
      },
    ],
    match_id: 0,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <MatchTeamStats team={data} />
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

  it('should navigate on click row', async () => {
    renderComponent()

    const row = screen.getByTestId('row')
    fireEvent.click(row)

    await waitFor(() =>
      expect(mockUseNavigate).toHaveBeenCalledWith('/perfil/1')
    )
  })
})
