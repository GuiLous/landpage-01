import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import MatchFoundModal from './MatchFoundModal'

describe('MatchFoundModal', () => {
  const mockStore = configureStore()({})

  it('should renders correctly', () => {
    const preMatch = {
      countdown: 10,
    }

    render(
      <Provider store={mockStore}>
        <MatchFoundModal
          isOpen={true}
          setIsOpen={() => {}}
          preMatch={preMatch}
        />
      </Provider>
    )

    expect(screen.getByText('PARTIDA ENCONTRADA')).toBeInTheDocument()
    expect(screen.getByText('Ranqueada · 5x5')).toBeInTheDocument()
  })

  it('should renders the user icons based on the preMatch data', () => {
    const preMatch = {
      players_total: 5,
      players_ready_count: 3,
      countdown: 10,
    }

    render(
      <Provider store={mockStore}>
        <MatchFoundModal
          isOpen={true}
          setIsOpen={() => {}}
          preMatch={preMatch}
        />
      </Provider>
    )

    const userIcons = screen.getAllByTestId('user-icon')
    expect(userIcons.length).toBe(5)
    expect(userIcons[0]).toHaveStyle('opacity: 1')
    expect(userIcons[1]).toHaveStyle('opacity: 1')
    expect(userIcons[2]).toHaveStyle('opacity: 1')
    expect(userIcons[3]).toHaveStyle('opacity: 0.5')
    expect(userIcons[4]).toHaveStyle('opacity: 0.5')
  })

  it('should disable the accept button if user_ready is true', () => {
    const preMatch = {
      user_ready: true,
      countdown: 10,
    }

    render(
      <Provider store={mockStore}>
        <MatchFoundModal
          isOpen={true}
          setIsOpen={() => {}}
          preMatch={preMatch}
        />
      </Provider>
    )

    const acceptButton = screen.getByText('Você está pronto!')
    expect(acceptButton).toBeDisabled()
  })

  it('should display the countdown timer if preMatch is defined', () => {
    const preMatch = { countdown: 60 }
    render(
      <Provider store={mockStore}>
        <MatchFoundModal
          isOpen={true}
          setIsOpen={() => {}}
          preMatch={preMatch}
        />
      </Provider>
    )

    const timerElement = screen.getByTestId('countdown-timer')
    expect(timerElement).toBeInTheDocument()
    expect(timerElement).toHaveTextContent('01:00')
  })

  it('should does not display the countdown timer if preMatch is undefined', () => {
    render(
      <Provider store={mockStore}>
        <MatchFoundModal
          isOpen={true}
          setIsOpen={() => {}}
          preMatch={undefined}
        />
      </Provider>
    )

    const timerElement = screen.getByTestId('countdown-timer')
    expect(timerElement).not.toHaveTextContent('01:00')
  })
})
