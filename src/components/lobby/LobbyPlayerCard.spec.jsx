import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { LobbyPlayerCard } from '@components'

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
  onClose: () => false,
  closeLabel: 'Sair',
  isLobbyOwner: false,
}

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LobbyPlayerCard {...props} />
    </BrowserRouter>
  )
}
describe('LobbyPlayerCard Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('V')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })

  it('should render close button label correctly', () => {
    props.closeLabel = 'Remover'
    renderComponent()

    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
    expect(screen.getByText('Remover')).toBeInTheDocument()
  })

  it('should not render close button', () => {
    props.onClose = false
    renderComponent()

    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
  })

  it('should not render crown icon when isLobbyOwner false', () => {
    renderComponent()

    const crownIcon = screen.queryByTestId('crown-icon')

    expect(crownIcon).not.toBeInTheDocument()
  })

  it('should render crown icon when isLobbyOwner true', () => {
    props.isLobbyOwner = true
    renderComponent()

    const crownIcon = screen.getByTestId('crown-icon')

    expect(crownIcon).toBeInTheDocument()
  })
})
