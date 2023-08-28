import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarAvatarLink } from '@components'

const renderComponent = () => {
  const user = {
    id: 1,
    account: {
      level: 2,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
      username: 'Username',
    },
    status: 'online',
  }

  render(
    <BrowserRouter>
      <SidebarAvatarLink user={user} />
    </BrowserRouter>
  )
}

describe('SidebarAvatarLink Component', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
  })
})
