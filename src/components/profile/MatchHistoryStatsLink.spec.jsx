import { render, screen } from '@testing-library/react'

import { MatchHistoryStatsLink } from '@components'
import { BrowserRouter } from 'react-router-dom'

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
  map_name: 'Inferno',
}

describe('MatchHistoryStatsLink Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user={user} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Inferno')).toBeInTheDocument()
  })

  it('should render kdr correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user={user} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('kdr').textContent).toEqual('2.0')
  })

  it('should render hs percentage correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user={user} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('hs%').textContent).toEqual('20.0%')
  })

  it('should render adr correctly', () => {
    render(
      <BrowserRouter>
        <MatchHistoryStatsLink user={user} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('adr').textContent).toEqual('33.33')
  })
})
