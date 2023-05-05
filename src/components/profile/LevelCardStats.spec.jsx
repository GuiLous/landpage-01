import { render, screen } from '@testing-library/react'

import { LevelCardStats } from '@components'

describe('LevelCardStats Component', () => {
  const profile = {
    level: 50,
    stats: {
      wins: 10,
      loses: 5,
      win_rate: 68,
      kda_rate: 0.88,
      adr_rate: 93.5,
      hs_percent: 8,
      combat_points: 173,
      economic_points: 8,
    },
  }

  it('should renders correctly', () => {
    render(<LevelCardStats profile={profile} />)

    expect(screen.getByText('LEVEL 50')).toBeInTheDocument()
    expect(screen.getByText('Abates/Mortes')).toBeInTheDocument()
    expect(screen.getByText('Dano/Rodada')).toBeInTheDocument()
    expect(screen.getByText('68%')).toBeInTheDocument()
    expect(screen.getByText('0.88')).toBeInTheDocument()
  })
})
