import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import InviteReducer from '@slices/InviteSlice'
import MatchReducer from '@slices/MatchSlice'
import UserReducer from '@slices/UserSlice'
import { LobbyView } from '@views'

const user = {
  id: 1,
  account: {
    level: 1,
    friends: [],
    username: 'player1',
    notifications: [],
    lobby_invites: [],
    avatar: {
      small:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
      medium:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      large:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    },
    lobby: {
      id: 1,
      restriction_countdown: 60,
      owner_id: 1,
      players: [
        {
          id: 1,
          level: 1,
          username: 'player1',
          avatar: {
            small:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
            medium:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
            large:
              'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
          },
        },
      ],
    },
  },
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    match: MatchReducer,
    invites: InviteReducer,
  },
  preloadedState: { user },
})

describe('Lobby View Test Case', () => {
  it('should render restriction button if restricted', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LobbyView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('Fila restringida')).toBeInTheDocument()
  })

  it('should not render restriction button if restricted', () => {
    user.account.lobby.restriction_countdown = 0

    render(
      <BrowserRouter>
        <Provider store={store}>
          <LobbyView />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.queryByText('Fila restringida')).not.toBeInTheDocument()
  })
})
