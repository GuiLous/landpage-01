import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import MatchReducer from '@slices/MatchSlice'
import { ConnectView } from '@views'

describe('MatchView Component', () => {
  const match = {
    id: 1,
    status: 'warmup',
    server_ip: '999.999.999.999',
  }

  const store = configureStore({
    reducer: {
      match: MatchReducer,
    },
    preloadedState: { match },
  })

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('gta')).toBeInTheDocument()
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByText('É hora do jogo!')).toBeInTheDocument()
    expect(screen.getByText('IP: 999.999.999.999')).toBeInTheDocument()
  })

  it('should render loading when status is loading', () => {
    match.status = 'loading'

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Ligando as luzes')).toBeInTheDocument()
  })

  it('should copy ip when clicked', async () => {
    match.status = 'warmup'

    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectView />
        </Provider>
      </BrowserRouter>
    )

    const copyButton = screen.getByTestId('clipboard')

    expect(copyButton).toBeInTheDocument()

    user.click(copyButton)

    await waitFor(() => {
      expect(screen.getByText('Copiado!')).toBeInTheDocument()
    })
  })
})
