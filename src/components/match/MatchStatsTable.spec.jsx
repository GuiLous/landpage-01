import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MatchStatsTable } from '@components'
import UserReducer from '@slices/UserSlice'

describe('MatchStatsTable Component', () => {
  it('should renders correctly', () => {
    const user = {
      id: 1,
    }

    const data = {
      id: 1,
      name: 'string',
      score: 0,
      players: [
        {
          id: 12,
          level: 10,
          level_points: 40,
          match_id: 0,
          team_id: 0,
          user_id: 12,
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchStatsTable stats={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('should renders with text Meu Time when logged user is on players array', () => {
    const user = {
      id: 1,
    }

    const data = {
      id: 0,
      name: 'string',
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchStatsTable stats={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Meu Time')).toBeInTheDocument()
  })

  it('should renders with text Time Inimigo when logged user is not in players array', () => {
    const user = {
      id: 1,
    }

    const data = {
      id: 0,
      name: 'string',
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchStatsTable stats={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Time Inimigo')).toBeInTheDocument()
  })

  it('should renders players data', () => {
    const user = {
      id: 1,
    }

    const data = {
      id: 0,
      name: 'string',
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MatchStatsTable stats={data} />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('GuiLous')).toBeInTheDocument()
    expect(screen.getByText('3P')).toBeInTheDocument()
    expect(screen.getByText('6D')).toBeInTheDocument()
  })
})
