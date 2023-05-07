import { render, screen } from '@testing-library/react'

import { LevelCardStats } from '@components'

describe('LevelCardStats Component', () => {
  const profile = {
    level: 50,
    stats: {
      wins: 10,
      loses: 5,
      krd_rate: 0.88,
      economic_points: 8,
      adr_rate: 93.5,
      max_kills: 15,
      hs_percent: 88,
      max_damage: 190,
      combat_points: 400,
    },
    last_five_matches: ['win', 'loss', 'win', 'loss', 'loss'],
  }

  it('should renders correctly', () => {
    render(<LevelCardStats profile={profile} />)

    expect(screen.getByText('VITÓRIAS')).toBeInTheDocument()
    expect(screen.getByText('ABATES/MORTES')).toBeInTheDocument()
    expect(screen.getByText('DANO/RODADA')).toBeInTheDocument()
    expect(screen.getByText('88%')).toBeInTheDocument()
    expect(screen.getByText('0.88')).toBeInTheDocument()
  })
})
