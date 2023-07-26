import { render, screen } from '@testing-library/react'

import { MatchHistoryStatsLink } from '@components'
import { BrowserRouter } from 'react-router-dom'

const user_id = 1

const match = {
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
          },
        },
      ],
    },
  ],
  id: 0,
  winner_id: 11,
  rounds: 15,
  start_date: '2023-05-05T10:00:00',
  end_date: '2023-05-05T10:30:00',
  map: {
    name: 'Auditório',
  },
}

describe('MatchHistoryStatsLink Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user_id={user_id} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Auditório')).toBeInTheDocument()
  })

  it('should render kdr correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user_id={user_id} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('kdr').textContent).toEqual('2.0')
  })

  it('should render hs percentage correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user_id={user_id} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('hs%').textContent).toEqual('20.0%')
  })

  it('should render adr correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user_id={user_id} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('adr').textContent).toEqual('33.33')
  })
})
