import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarLobbyButton } from '@components'

describe('SidebarLobbyButton Component', () => {
  let lobby = {
    queue: null,
    queue_time: 300,
    restriction_countdown: null,
  }

  let match = null

  it('should render correctly', async () => {
    render(
      <BrowserRouter>
        <SidebarLobbyButton lobby={lobby} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Lobby')).toBeInTheDocument()
  })

  it('should render match button when is on match', async () => {
    render(
      <BrowserRouter>
        <SidebarLobbyButton lobby={lobby} match={true} />
      </BrowserRouter>
    )

    expect(screen.getByText('Em partida')).toBeInTheDocument()
  })

  it('should render queue button when is on queue', async () => {
    lobby.queue = true
    lobby.queue_time = 60

    render(
      <BrowserRouter>
        <SidebarLobbyButton lobby={lobby} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Na fila')).toBeInTheDocument()
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })

  it('should render restricted button when is restricted', async () => {
    lobby.queue = false
    lobby.restriction_countdown = 60

    render(
      <BrowserRouter>
        <SidebarLobbyButton lobby={lobby} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Restrito')).toBeInTheDocument()
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })
})
