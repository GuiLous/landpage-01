import { render, screen } from '@testing-library/react'

import { MatchHistoryStatsAccordion } from '@components'

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
  winner_id: 11,
  rounds: 15,
  start_date: '2023-05-05T10:00:00',
  end_date: '2023-05-05T10:30:00',
  map_name: 'Inferno',
}

describe('MatchHistoryStatsAccordion Component', () => {
  it('should renders correctly', () => {
    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByText('Derrota')).toBeInTheDocument()
    expect(screen.getByText('Inferno')).toBeInTheDocument()
  })

  it('should renders with text Vitória when user is on winner team', () => {
    match.winner_id = 10

    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByText('Vitória')).toBeInTheDocument()
  })

  it('should renders with text Derrota user is not on winner team', () => {
    match.winner_id = 11

    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByText('Derrota')).toBeInTheDocument()
  })

  it('should renders kda correctly', () => {
    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByTestId('kda').textContent).toEqual('5.00 KDA')
  })

  it('should renders kpr correctly', () => {
    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByTestId('kpr').textContent).toEqual('0.67 KPR')
  })

  it('should renders ADR correctly', () => {
    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByTestId('adr').textContent).toEqual('33.33 ADR')
  })

  it('should renders HS% correctly', () => {
    render(<MatchHistoryStatsAccordion user={user} match={match} />)

    expect(screen.getByTestId('hs').textContent).toEqual('20.0% HS')
  })
})
