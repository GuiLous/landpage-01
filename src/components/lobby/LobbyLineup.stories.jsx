import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Container, LobbyLineup } from '@components'
import AppReducer from '@slices/AppSlice'

export default {
  title: 'Lobby/LobbyLineup',
  component: LobbyLineup,
  argTypes: {
    otherPlayersCount: { control: { type: 'range', min: 0, max: 4 } },
    isOwner: { control: 'boolean' },
    userPlayer: { control: 'object' },
    maxPlayers: { table: { disable: true } },
    lobbyId: { table: { disable: true } },
  },
  args: {
    otherPlayersCount: 0,
    isOwner: false,
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
    lobbyId: 1,
  },
  parameters: {
    mockData: [
      {
        url: 'http://localhost:8000/api/lobbies/:lobbyId/players/:playerId/',
        method: 'DELETE',
        status: 200,
        response: {},
      },
    ],
  },
}

const app = {
  toasts: [],
  friendListOpen: false,
}

const store = configureStore({
  reducer: { app: AppReducer },
  devTools: true,
  preloadedState: { app },
})

export const Default = {
  render: (props) => {
    const players = Array.from(Array(props.otherPlayersCount).keys()).map(
      (player, index) => ({
        username: `Player ${index + 2}`,
        user_id: index + 2,
        avatar: {
          large:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        latest_matches_results: ['V', 'D', 'N/A', 'N/A', 'N/A'],
        matches_played: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 10),
        steam_url: `https://steamcommunity.com/profiles/${index + 2}`,
      })
    )

    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container style={{ height: '90vh' }}>
            <LobbyLineup {...props} otherPlayers={players} />
          </Container>
        </Provider>
      </BrowserRouter>
    )
  },
}
