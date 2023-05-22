import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { FriendListGroupItem } from '@components'
import InviteReducer from '@slices/InviteSlice'
import UserReducer from '@slices/UserSlice'

const server = setupServer(
  rest.post(
    'http://localhost:8000/api/mm/lobby/1/invite-player/2/',
    (req, res, ctx) => {
      return res(
        ctx.json({
          to_player: { id: 2 },
        })
      )
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('FriendListGroupItem Component', () => {
  const user = {
    id: 1,
    account: {
      lobby: {
        id: 1,
      },
      lobby_invites_sent: [],
    },
  }

  const invites = {
    received: [],
    sent: [],
    unread: 0,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      invites: InviteReducer,
    },
    preloadedState: { user, invites },
  })

  it('should render an online friend corretcly', () => {
    const friend = {
      id: 2,
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
      id: 2,
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
      id: 2,
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
    const action = await screen.findByTestId('action')
    expect(action).toBeInTheDocument()
    expect(screen.queryByTestId('icon-invited')).not.toBeInTheDocument()
    expect(await screen.findByTestId('icon-available')).toBeInTheDocument()

    await waitFor(() => user.click(action))

    expect(await screen.findByTestId('icon-invited')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-available')).not.toBeInTheDocument()
  })
})
