import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Sidebar } from '@components'
import AppReducer from '@slices/AppSlice'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'

const server = setupServer(
  rest.get('http://localhost:8000/api/friends/', (req, res, ctx) => {
    return res(
      ctx.json({
        online: [
          {
            id: 2,
            status: 'online',
            username: 'Amigo 2',
            avatar:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            lobby: {
              id: 1,
            },
          },
          {
            id: 3,
            status: 'online',
            username: 'Amigo 3',
            avatar:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            lobby: {
              id: 3,
            },
          },
        ],
        offline: [
          {
            id: 4,
            status: 'offline',
            username: 'Amigo 4',
            avatar:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            lobby: {
              id: 4,
            },
          },
        ],
      })
    )
  }),

  rest.get('http://localhost:8000/api/notifications/', (req, res, ctx) =>
    res(ctx.json([]))
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Sidebar Component', () => {
  const user = {
    id: 1,
    account: {
      level: 2,
      level_points: 56,
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
      username: 'Username',
      lobby: {
        queue: null,
        id: 1,
      },
    },
  }

  const invites = {
    list: [],
    unread: 0,
  }

  const match = {
    preMatch: null,
    match: null,
  }

  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const friends = {
    online: [],
    offline: [],
  }

  const notifications = []

  const store = configureStore({
    reducer: {
      user: UserReducer,
      notifications: NotificationReducer,
      invites: InviteReducer,
      match: MatchReducer,
      app: AppReducer,
      friends: FriendReducer,
    },
    preloadedState: { user, friends, notifications, invites, app, match },
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
