import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { StorageService } from '@services'
import MatchReducer from '@slices/MatchSlice'
import { ConnectView } from '@views'

jest.mock('@services', () => ({
  StorageService: {
    remove: jest.fn(),
    load: jest.fn(),
    save: jest.fn(),
  },
}))

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

let match = {
  id: 1,
  status: 'warmup',
  server_ip: '999.999.999.999',
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      match: MatchReducer,
    },
    preloadedState: { match },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <ConnectView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Connect View', () => {
  beforeEach(() => {
    match = {
      id: 1,
      status: 'warmup',
      server_ip: '999.999.999.999',
    }
  })

  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByTestId('gta')).toBeInTheDocument()
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByText('É hora do jogo!')).toBeInTheDocument()
    expect(screen.getByText('IP: 999.999.999.999')).toBeInTheDocument()
  })

  it('should render loading when status is loading', () => {
    match.status = 'loading'

    renderComponent()

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Ligando as luzes')).toBeInTheDocument()
  })

  it('should copy ip when clicked', async () => {
    match.status = 'warmup'

    const user = userEvent.setup()

    renderComponent()

    const copyButton = screen.getByTestId('clipboard')

    expect(copyButton).toBeInTheDocument()

    user.click(copyButton)

    await waitFor(() => {
      expect(screen.getByText('Copiado!')).toBeInTheDocument()
    })
  })

  it('should redirect to /jogar if has no match', async () => {
    match = null

    renderComponent()

    await waitFor(() =>
      expect(StorageService.remove).toHaveBeenCalledWith('matchConnectTimer')
    )
    expect(mockNavigate).toHaveBeenCalledWith('/jogar')
    expect(screen.queryByTestId('gta')).not.toBeInTheDocument()
  })

  it('should redirect to /jogar if match status is cancelled', async () => {
    match.status = 'cancelled'

    renderComponent()

    await waitFor(() =>
      expect(StorageService.remove).toHaveBeenCalledWith('matchConnectTimer')
    )
    expect(mockNavigate).toHaveBeenCalledWith('/jogar')
    expect(screen.queryByTestId('gta')).not.toBeInTheDocument()
  })

  it('should redirect to /partidas/matchId if match status is running', async () => {
    match.status = 'running'

    renderComponent()

    await waitFor(() =>
      expect(StorageService.remove).toHaveBeenCalledWith('matchConnectTimer')
    )
    expect(mockNavigate).toHaveBeenCalledWith('/partidas/1')
    expect(screen.queryByTestId('gta')).not.toBeInTheDocument()
  })
})
