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
      losses: 100,
      kills: 2000,
      deaths: 1800,
      assists: 800,
      head_shots: 1200,
    },
  }

  it('should renders correctly', () => {
    render(<HeaderProfile profile={profile} />)

    expect(screen.getByText('Vitórias')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('2000')).toBeInTheDocument()
    expect(screen.getByText('1800')).toBeInTheDocument()
    expect(screen.getByText('800')).toBeInTheDocument()
    expect(screen.getByText('1200')).toBeInTheDocument()
  })
})
