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
    stats: {
      kills: 240,
      deaths: 640,
      assists: 350,
      damage: 65020,
      hs_kills: 45,
      clutch_v1: 39,
      clutch_v2: 25,
      clutch_v3: 9,
      clutch_v4: 0,
      clutch_v5: 1,
      shots_fired: 4500,
      head_shots: 45,
      chest_shots: 4065,
      other_shots: 390,
      most_kills_in_a_match: 14,
      most_damage_in_a_match: 890,
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
