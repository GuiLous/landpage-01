import { render, screen } from '@testing-library/react'

import { FavoriteWeaponCard } from '@components'

describe('FavoriteWeaponCard Component', () => {
  const weapon = {
    avatar:
      'https://static.wikia.nocookie.net/gtawiki/images/5/56/AssaultSMG-GTAV-SocialClub.png',
    name: 'SMG',
    type: 'Submetralhadora',
    stats: {
      kills: 450,
      assists: 900,
      head_shots: 133,
      shots_fired: 3450,
      hit_shots: 1390,
      matches: 230,
      wins: 103,
    },
  }

  it('should render correctly', () => {
    render(<FavoriteWeaponCard weapon={weapon} />)
    expect(screen.getByText('Arma favorita')).toBeInTheDocument()
    expect(screen.getByText('SMG')).toBeInTheDocument()
    expect(screen.getByText('Submetralhadora')).toBeInTheDocument()
  })
})
