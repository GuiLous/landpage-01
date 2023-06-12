import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { LobbyPlayerCard } from '@components'

describe('LobbyPlayerCard Component', () => {
  let props = {
    player: {
      username: 'Username',
      user_id: 9,
      avatar: {
        large:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
      matches_played: 2,
      level: 1,
      steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
    },
    onClose: true,
    closeLabel: 'Sair',
  }

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <LobbyPlayerCard {...props} />
      </BrowserRouter>
    )
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should render close button label correctly', () => {
    props.closeLabel = 'Remover'
    render(
      <BrowserRouter>
        <LobbyPlayerCard {...props} />
      </BrowserRouter>
    )
    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
    expect(screen.getByText('Remover')).toBeInTheDocument()
  })

  it('should not render close button', () => {
    props.onClose = false
    render(
      <BrowserRouter>
        <LobbyPlayerCard {...props} />
      </BrowserRouter>
    )
    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
  })
})
