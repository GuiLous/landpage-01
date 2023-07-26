import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { FriendListGroupItem } from '@components'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'

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
      <Provider store={store}>
        <FriendListGroupItem {...friend} />
      </Provider>
    )
    expect(screen.getByText('friendUsername')).toBeInTheDocument()
    expect(screen.getByText('Disponível')).toBeInTheDocument()
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
      <Provider store={store}>
        <FriendListGroupItem {...friend} />
      </Provider>
    )
    expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument()
  })

  it('should render the correspondent icon for invite or invited', async () => {
    const user = userEvent.setup()

    const friend = {
      user_id: 2,
      lobby_id: 2,
      status: 'online',
      avatar:
        'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      username: 'friendUsername',
    }

    render(
      <Provider store={store}>
        <FriendListGroupItem {...friend} />
      </Provider>
    )
    const inviteButton = await screen.findByTestId('invite-button')
    expect(inviteButton).toBeInTheDocument()
    expect(screen.queryByTestId('icon-invited')).not.toBeInTheDocument()
    expect(await screen.findByTestId('icon-available')).toBeInTheDocument()

    await waitFor(() => user.click(inviteButton))

    expect(await screen.findByTestId('icon-invited')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-available')).not.toBeInTheDocument()
  })
})
