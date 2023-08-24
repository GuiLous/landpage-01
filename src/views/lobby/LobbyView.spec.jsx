import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { PreMatchesAPI } from '@api'
import LobbyReducer from '@slices/LobbySlice'
import PreMatchReducer from '@slices/PreMatchSlice'
import UserReducer from '@slices/UserSlice'
import { LobbyView } from '@views'

jest.mock('@api', () => ({
  PreMatchesAPI: {
    playerLockIn: jest.fn(),
  },
}))

const user = {
  id: 1,
  match_id: 1,
}

let preMatch = null

const lobby = {
  players: [
    {
      username: 'Player 1',
      user_id: 1,
      avatar: {
        large:
          'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
      },
      latest_matches_results: ['V', 'D'],
      matches_played: 1,
      level: 10,
      steam_url: 'https://steamcommunity.com/profiles/1',
    },
  ],
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
      preMatch: PreMatchReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, preMatch, lobby },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <LobbyView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Lobby View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Suba de nível e')).toBeInTheDocument()
    expect(screen.getByText('fique entre os melhores')).toBeInTheDocument()
    expect(screen.getByText('TDM 5x5')).toBeInTheDocument()
    expect(screen.getByText('Ranqueada 5x5')).toBeInTheDocument()
    expect(screen.getByText('Personalizada')).toBeInTheDocument()
  })

  it('should call playerLockIn if preMatch state is pre_start', async () => {
    preMatch = { state: 'pre_start' }
    PreMatchesAPI.playerLockIn.mockResolvedValue({})

    renderComponent()

    await waitFor(() => expect(PreMatchesAPI.playerLockIn).toHaveBeenCalled())
  })

  it('should open MatchFoundModal if preMatch state is lock_in', async () => {
    preMatch = { state: 'lock_in' }
    renderComponent()

    await screen.findByText('PARTIDA ENCONTRADA')
  })
})
