import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { PreMatchesAPI } from '@api'
import MatchFoundModal from './MatchFoundModal'

jest.mock('@api', () => ({
  PreMatchesAPI: {
    playerReady: jest.fn(),
  },
}))

const renderComponent = (preMatch) => {
  const mockStore = configureStore()({})

  render(
    <Provider store={mockStore}>
      <MatchFoundModal isOpen={true} setIsOpen={() => {}} preMatch={preMatch} />
    </Provider>
  )
}

describe('MatchFoundModal component', () => {
  it('should render correctly', () => {
    const preMatch = {
      countdown: 10,
    }

    renderComponent(preMatch)

    expect(screen.getByText('PARTIDA ENCONTRADA')).toBeInTheDocument()
    expect(screen.getByText('Ranqueada · 5x5')).toBeInTheDocument()
  })

  it('should render the user icons based on the preMatch data', () => {
    const preMatch = {
      players_total: 5,
      players_ready_count: 3,
      countdown: 10,
    }

    renderComponent(preMatch)

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

    renderComponent(preMatch)

    const acceptButton = screen.getByText('Você está pronto!')
    expect(acceptButton).toBeDisabled()
  })

  it('should display the countdown timer if preMatch is defined', () => {
    const preMatch = { countdown: 60 }

    renderComponent(preMatch)

    const timerElement = screen.getByTestId('countdown-timer')
    expect(timerElement).toBeInTheDocument()
    expect(timerElement).toHaveTextContent('01:00')
  })

  it('should does not display the countdown timer if preMatch is undefined', () => {
    renderComponent()

    const timerElement = screen.getByTestId('countdown-timer')
    expect(timerElement).not.toHaveTextContent('01:00')
  })

  it('should call playerReady on click button', async () => {
    PreMatchesAPI.playerReady.mockResolvedValue({})

    renderComponent()

    const acceptButton = screen.getByText('Aceitar partida')

    fireEvent.click(acceptButton)

    await waitFor(() =>
      expect(PreMatchesAPI.playerReady).toHaveBeenCalledTimes(1)
    )
  })
})
