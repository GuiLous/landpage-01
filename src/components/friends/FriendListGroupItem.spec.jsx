import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { FriendListGroupItem } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'
import { BrowserRouter } from 'react-router-dom'

const server = setupServer(
  rest.post('http://localhost:8000/api/lobbies/invites/', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1:2',
        lobby_id: 1,
        from_player: { user_id: 1 },
        to_player: { user_id: 2 },
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('FriendListGroupItem Component', () => {
  const user = {
    id: 1,
    lobby_id: 1,
  }

  const invites = []

  const lobby = {
    queue: null,
    invited_players_ids: [],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, invites, lobby },
  })

  it('should render an online friend corretcly', () => {
    const friend = {
      user_id: 2,
      lobby_id: 2,
      status: 'online',
      avatar:
        'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      username: 'friendUsername',
    }

    render(
      <BrowserRouter>
        <Provider store={store}>
          <FriendListGroupItem {...friend} />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('friendUsername')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('should not render action if friend is offline', () => {
    const friend = {
      user_id: 2,
      lobby_id: 2,
      status: 'offline',
      avatar:
        'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      username: 'friendUsername',
    }

    render(
      <BrowserRouter>
        <Provider store={store}>
          <FriendListGroupItem {...friend} />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument()
  })
})
