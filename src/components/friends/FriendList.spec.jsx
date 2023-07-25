import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { FriendList } from '@components'
import FriendReducer from '@slices/FriendSlice'
import InviteReducer from '@slices/InviteSlice'
import LobbyReducer from '@slices/LobbySlice'
import UserReducer from '@slices/UserSlice'
import { BrowserRouter } from 'react-router-dom'

describe('FriendList Component', () => {
  const user = {
    id: 1,
    lobby_id: 1,
  }

  const friends = {
    online: [
      {
        user_id: 2,
        status: 'online',
        username: 'Amigo 2',
        avatar:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        lobby_id: 2,
      },
      {
        user_id: 3,
        status: 'online',
        username: 'Amigo 3',
        avatar:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        lobby_id: 3,
      },
    ],
    offline: [
      {
        user_id: 4,
        status: 'offline',
        username: 'Amigo 4',
        avatar:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        lobby_id: 4,
      },
    ],
  }

  const invites = [
    {
      id: '100:1',
      from_player: {
        user_id: 100,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        status: 'online',
        username: `User 100`,
      },
      to_player: {
        user_id: 1,
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        status: 'online',
        username: `User 1`,
      },
    },
  ]

  const lobby = {
    queue: null,
    id: 1,
    players: [{ user_id: 1 }],
    invited_players_ids: [],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      friends: FriendReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, friends, invites, lobby },
  })

  it('should not render if closed', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FriendList />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.queryByTestId('friendlist-container')).not.toBeInTheDocument()
    expect(screen.queryByText('Amigos')).not.toBeInTheDocument()
  })

  it('should render if open', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FriendList isOpen />
        </Provider>
      </BrowserRouter>
    )
    expect(
      await screen.findByTestId('friendlist-container')
    ).toBeInTheDocument()
    expect(await screen.findByText('Amigos')).toBeInTheDocument()
  })

  it('should filter results on input change', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <Provider store={store}>
          <FriendList isOpen />
        </Provider>
      </BrowserRouter>
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
