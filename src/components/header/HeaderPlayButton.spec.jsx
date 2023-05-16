import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { HeaderPlayButton } from '@components'

describe('HeaderPlayButton Component', () => {
  const user = {
    account: {
      lobby: {
        queue: null,
        queue_time: null,
      },
    },
  }

  it('should renders correctly', () => {
    render(
      <BrowserRouter>
        <HeaderPlayButton user={user} />
      </BrowserRouter>
    )

    expect(screen.getByText('Jogar')).toBeInTheDocument()
  })

  it('should renders with text Em partida', () => {
    const match = true

    render(
      <BrowserRouter>
        <HeaderPlayButton user={user} match={match} />
      </BrowserRouter>
    )

    expect(screen.getByText('Em partida')).toBeInTheDocument()
  })

  it('should renders with Timer component', () => {
    user.account.lobby.queue = true
    user.account.lobby.queue_time = 0

    render(
      <BrowserRouter>
        <HeaderPlayButton user={user} />
      </BrowserRouter>
    )

    expect(screen.getByText('Na fila')).toBeInTheDocument()
    expect(screen.getByText('0:00')).toBeInTheDocument()
  })
})
