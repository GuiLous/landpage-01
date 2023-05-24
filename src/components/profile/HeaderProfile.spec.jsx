import { render, screen } from '@testing-library/react'

import { HeaderProfile } from '@components'

describe('HeaderProfile Component', () => {
  const profile = {
    avatar: {
      medium:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    },
    status: 'online',
    username: 'fulaninhodetal',
    level: 20,
    level_points: 80,
    stats: {
      wins: 80,
    },
  }

  it('should renders correctly', () => {
    render(<HeaderProfile profile={profile} />)

    expect(screen.getByText('Level 20')).toBeInTheDocument()
    expect(screen.getByText('Vitórias')).toBeInTheDocument()
  })
})
