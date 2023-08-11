import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { SidebarLobbyButton } from '@components'

let lobby = {
  queue: null,
  queue_time: 300,
  restriction_countdown: null,
}

let match = null

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SidebarLobbyButton lobby={lobby} match={match} />
    </BrowserRouter>
  )
}
describe('SidebarLobbyButton Component', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Lobby')).toBeInTheDocument()
  })

  it('should render match button when is on match', async () => {
    match = true
    renderComponent()

    expect(screen.getByText('Em partida')).toBeInTheDocument()
  })

  it('should render queue button when is on queue', async () => {
    lobby.queue = true
    lobby.queue_time = 60
    match = false
    renderComponent()

    expect(screen.getByText('Na fila')).toBeInTheDocument()
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })

  it('should render restricted button when is restricted', async () => {
    lobby.queue = false
    lobby.restriction_countdown = 60

    renderComponent()

    expect(screen.getByText('Restrito')).toBeInTheDocument()
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })
})
