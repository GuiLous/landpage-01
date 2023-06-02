import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
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
          },
        ],
        offline: [
          {
            id: 3,
            status: 'offline',
            username: 'Amigo 3',
            avatar:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
          },
        ],
      })
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

  const store = configureStore({
    reducer: {
      user: UserReducer,
      friends: FriendReducer,
    },
    preloadedState: { user, friends },
  })

  it('should render header correctly', () => {
    render(
      <Provider store={store}>
        <FriendList />
      </Provider>
    )
    expect(screen.getByText('Amigos')).toBeInTheDocument()
    expect(screen.getByText('Online (0)')).toBeInTheDocument()
    expect(screen.getByText('Offline (0)')).toBeInTheDocument()
  })

  it('should open filtering upon user click', async () => {
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <FriendList />
      </Provider>
    )

    const openFilterBtn = screen.getByTestId('open-filter')
    const closeFilterBtn = screen.queryByTestId('close-filter')

    expect(openFilterBtn).toBeInTheDocument()
    expect(closeFilterBtn).not.toBeInTheDocument()

    await waitFor(() => user.click(openFilterBtn))
    expect(await screen.findByTestId('close-filter')).toBeInTheDocument()
    expect(screen.queryByTestId('open-filter')).not.toBeInTheDocument()

    const input = screen.getByTestId('input-filter')
    expect(input).toBeInTheDocument()
  })
})
