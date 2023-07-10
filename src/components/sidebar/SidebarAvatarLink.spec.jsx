import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarAvatarLink } from '@components'

describe('SidebarAvatarLink Component', () => {
  const user = {
    id: 1,
    account: {
      level: 2,
      level_points: 56,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
      username: 'Username',
      lobby: {
        queue: null,
        id: 1,
      },
    },
    lobby_id: 1,
    status: 'online',
  }

  it('should renders correctly', async () => {
    render(
      <BrowserRouter>
        <SidebarAvatarLink user={user} />
      </BrowserRouter>
    )

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('LEVEL 2')).toBeInTheDocument()
  })
})
