import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('FriendList Component', () => {
  const user = {
    id: 1,
    account: {
      lobby: {
        id: 1,
      },
      lobby_invites_sent: [],
    },
  }

  const friends = {
    online: [],
    offline: [],
  }

  const invites = {
    list: [],
    unread: 0,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      friends: FriendReducer,
      invites: InviteReducer,
    },
    preloadedState: { user, friends, invites },
  })

  it('should not render if closed', () => {
    render(
      <Provider store={store}>
        <FriendList />
      </Provider>
    )
    expect(screen.queryByTestId('friendlist-container')).not.toBeInTheDocument()
    expect(screen.queryByText('Amigos')).not.toBeInTheDocument()
  })

  it('should render if open', async () => {
    render(
      <Provider store={store}>
        <FriendList isOpen />
      </Provider>
    )
    expect(
      await screen.findByTestId('friendlist-container')
    ).toBeInTheDocument()
    expect(await screen.findByText('Amigos')).toBeInTheDocument()
  })

  it('should filter results on input change', async () => {
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <FriendList isOpen />
      </Provider>
    )

    const filterInput = screen.queryByTestId('filter-input')
    const friend2 = await screen.findByText('Amigo 2')
    const friend3 = await screen.findByText('Amigo 3')
    expect(filterInput).toBeInTheDocument()
    expect(friend2).toBeInTheDocument()
    expect(friend3).toBeInTheDocument()

    await waitFor(() => user.type(filterInput, '2'))
    expect(friend2).toBeInTheDocument()
    expect(friend3).not.toBeInTheDocument()
  })
})
