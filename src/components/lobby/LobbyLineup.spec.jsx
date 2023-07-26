import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { LobbyLineup } from '@components'
import AppReducer from '@slices/AppSlice'

describe('LobbyLineup Component', () => {
  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: { app: AppReducer },
    devTools: true,
    preloadedState: { app },
  })

  let props = {
    otherPlayers: [],
    userPlayer: {
      username: 'Username',
      user_id: 1,
      avatar: {
        large:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
      matches_played: 2,
      level: 1,
      steam_url: 'https://steamcommunity.com/profiles/76561198075990604',
    },
    lobby: {
      id: 1,
      owner_id: 1,
      queue: null,
    },
    match: null,
    preMatch: null,
  }

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LobbyLineup {...props} />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('2 Partidas jogadas')).toBeInTheDocument()
  })
})
