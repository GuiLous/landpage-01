import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Sidebar } from '@components'
import InviteReducer from '@slices/InviteSlice'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'

describe('Sidebar Component', () => {
  const user = {
    id: 1,
    account: {
      level: 5,
      level_points: 56,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
      username: 'Username',
      lobby: {
        queue: null,
      },
    },
  }

  const invites = {
    received: [],
    sent: [],
    unread: 0,
  }

  const match = {
    preMatch: null,
    match: null,
  }

  const notifications = []

  const store = configureStore({
    reducer: {
      user: UserReducer,
      notifications: NotificationReducer,
      invites: InviteReducer,
      match: MatchReducer,
    },
    preloadedState: { user, notifications, invites, match },
  })

  it('should respect collapsable prop', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Amigos')).toBeInTheDocument()
    expect(screen.getByText('Notificações')).toBeInTheDocument()

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('container')
    expect(container).not.toHaveClass('collapsed')

    await waitFor(() => user.hover(container))
    expect(container).not.toHaveClass('collapsed')
  })

  it('should expand when user hover on and collapse when hover out', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar collapsable />
        </Provider>
      </BrowserRouter>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('collapsed')

    await waitFor(() => user.hover(container))
    expect(container).not.toHaveClass('collapsed')
  })

  it('should only render menu titles when not collapsed', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar collapsable />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.queryByText('Amigos')).not.toBeInTheDocument()
    expect(screen.queryByText('Notificações')).not.toBeInTheDocument()

    const container = screen.getByTestId('container')
    await waitFor(() => user.hover(container))
    expect(await screen.findByText('Amigos')).toBeInTheDocument()
    expect(await screen.findByText('Notificações')).toBeInTheDocument()
  })

  it('should render logo full when collapsed and symbol otherwise', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar collapsable />
        </Provider>
      </BrowserRouter>
    )

    const container = screen.getByTestId('container')
    const logoFull = screen.queryByTestId('logo-full')
    const logoSymbol = screen.queryByTestId('logo-symbol')

    expect(logoSymbol).toBeInTheDocument()
    expect(logoFull).toBeInTheDocument()
    expect(logoFull).toHaveStyle({ height: 0 })
    expect(logoSymbol).toHaveStyle({ height: 'auto' })

    await waitFor(() => user.hover(container))
    expect(logoFull).toHaveStyle({ height: 'auto' })
    expect(logoSymbol).toHaveStyle({ height: 0 })
  })
})
