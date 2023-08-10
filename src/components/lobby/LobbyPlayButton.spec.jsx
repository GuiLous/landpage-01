import { fireEvent, render, screen } from '@testing-library/react'

import { LobbyPlayButton } from '@components'

describe('LobbyPlayButton Component', () => {
  it('should render correctly', () => {
    render(<LobbyPlayButton />)

    expect(screen.getByText('Jogar')).toBeInTheDocument()
  })

  it('should render with restriction', () => {
    render(<LobbyPlayButton restrictionCountdown={60} disabled restricted />)

    expect(screen.getByText('Grupo com restrição')).toBeInTheDocument()
    expect(screen.getByText('01:00')).toBeInTheDocument()
    expect(screen.getByTestId('container')).toHaveClass('restricted')
  })

  it('should render queued', () => {
    render(<LobbyPlayButton queueTime={1} />)

    expect(screen.getByText('00:01')).toBeInTheDocument()
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
    expect(screen.getByTestId('container')).toHaveClass('queued')
  })

  it('should render disabled', () => {
    render(<LobbyPlayButton disabled />)

    expect(screen.getByTestId('container')).toHaveClass('disabled')
  })

  it('should call onClick', () => {
    const onClickMock = jest.fn()

    render(<LobbyPlayButton onClick={onClickMock} />)

    const container = screen.getByTestId('container')

    fireEvent.click(container)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
