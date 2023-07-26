import { render, screen } from '@testing-library/react'

import { LevelStatsCard } from '@components'

describe('LevelStatsCard Component', () => {
  const props = {
    level: 20,
    highest_level: 23,
    matches_played: 340,
    match_won: 102,
    highest_win_streak: 8,
    latest_matches_results: ['V', 'D', 'D', 'V', 'V'],
    most_kills_in_a_match: 14,
    most_damage_in_a_match: 890,
    stats: {
      kills: 240,
      deaths: 640,
      assists: 350,
      damage: 65020,
      hs_kills: 45,
      shots_fired: 4500,
      head_shots: 45,
      chest_shots: 4065,
      other_shots: 390,
    },
  }

  it('should render correctly', () => {
    render(<LevelStatsCard {...props} />)

    expect(screen.getByText('Vitórias')).toBeInTheDocument()
    expect(screen.getByText('KDR')).toBeInTheDocument()
    expect(screen.getByText('Max Level')).toBeInTheDocument()
    expect(screen.getByText('1%')).toBeInTheDocument()
  })
})
