import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchTeamStats } from '@components'
import UserReducer from '@slices/UserSlice'

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
      user_id: 0,
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
        clutch_v1: 1,
        clutch_v2: 3,
        clutch_v3: 5,
        clutch_v4: 2,
        clutch_v5: 1,
        firstkills: 6,
        shots_fired: 500,
        head_shots: 5,
        chest_shots: 200,
        other_shots: 195,
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

describe('MatchTeamStats Component', () => {
  it('should renders correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchTeamStats team={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('should renders team data', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchTeamStats team={data} />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('OsKaravelhos')).toBeInTheDocument()
    expect(screen.getByText('GuiLous')).toBeInTheDocument()
  })

  it('should render hs% correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchTeamStats team={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('hs-percentage').textContent).toEqual('1.25%')
  })

  it('should render kdr correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchTeamStats team={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('kdr').textContent).toEqual('2.67')
  })

  it('should render dh correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchTeamStats team={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('dh').textContent).toEqual('0.90')
  })
})
