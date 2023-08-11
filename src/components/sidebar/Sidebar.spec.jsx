import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Sidebar } from '@components'
import AppReducer from '@slices/AppSlice'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import PreMatchReducer from '@slices/PreMatchSlice'
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
  ),

  rest.get('http://localhost:8000/api/lobbies/invites/', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '100:1',
          from_player: {
            avatar: {
              medium:
                'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
            },
            status: 'online',
            username: `User 100`,
          },
        },
      ])
    )
  })
)

const renderComponent = () => {
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
    lobby_id: 1,
    status: 'online',
  }

  const invites = []

  const match = null

  const preMatch = null

  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const friends = {
    online: [],
    offline: [],
  }

  const notifications = []

  const lobby = {
    queue: null,
    id: 1,
    players: [],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      notifications: NotificationReducer,
      invites: InviteReducer,
      match: MatchReducer,
      app: AppReducer,
      friends: FriendReducer,
      lobby: LobbyReducer,
      preMatch: PreMatchReducer,
    },
    preloadedState: {
      user,
      notifications,
      invites,
      match,
      app,
      friends,
      lobby,
      preMatch,
    },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <Sidebar />
      </Provider>
    </BrowserRouter>
  )
}

describe('Sidebar Component', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Level 2')).toBeInTheDocument()
    expect(screen.getByText('Lobby')).toBeInTheDocument()
    expect(screen.getByText('amigos')).toBeInTheDocument()
    expect(screen.getByText('notificações')).toBeInTheDocument()
    expect(screen.getByText('ranking')).toBeInTheDocument()
    expect(screen.getByText('loja')).toBeInTheDocument()
    expect(screen.getByText('suporte')).toBeInTheDocument()
    expect(screen.getByText('sair')).toBeInTheDocument()
  })

  it('should open friend list drawer on click button', async () => {
    renderComponent()

    const friendsBtn = screen.getByTestId('amigos')

    fireEvent.click(friendsBtn)

    await screen.findByText('Amigos')
  })

  it('should open notifications list drawer on click button', async () => {
    renderComponent()

    const notificationsBtn = screen.getByTestId('notificações')

    fireEvent.click(notificationsBtn)

    await screen.findByText('Notificações')
  })

  it('should open support modal on click button', async () => {
    renderComponent()

    const supportBtn = screen.getByTestId('suporte')

    fireEvent.click(supportBtn)

    await screen.findByText('SUPORTE RELOAD CLUB')
  })

  it('should open logout modal on click button', async () => {
    renderComponent()

    const logoutBtn = screen.getByTestId('sair')

    fireEvent.click(logoutBtn)

    await screen.findByText('ESTÁ INDO EMBORA?')
  })
})
