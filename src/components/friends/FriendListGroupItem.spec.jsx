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

const renderComponent = (status, inviteUserId = null) => {
  const user = {
    id: 1,
    lobby_id: 1,
  }

  const invites = [{ to_player: { user_id: inviteUserId } }]

  const lobby = {
    queue: null,
    invited_players_ids: [2],
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
      invites: InviteReducer,
      lobby: LobbyReducer,
    },
    preloadedState: { user, invites, lobby },
  })

  const friend = {
    user_id: 2,
    lobby_id: 2,
    status,
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
}

describe('FriendListGroupItem Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render an online friend correctly', () => {
    renderComponent('online')

    expect(screen.getByText('friendUsername')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('should render an offline friend correctly', () => {
    renderComponent('offline')

    expect(screen.getByText('friendUsername')).toBeInTheDocument()
    expect(screen.getByText('Offline')).toBeInTheDocument()
  })

  it('should render an teaming friend correctly', () => {
    renderComponent('teaming')

    expect(screen.getByText('friendUsername')).toBeInTheDocument()
    expect(screen.getByText('Em grupo')).toBeInTheDocument()
  })

  it('should render with class offline if is offline', () => {
    renderComponent('offline')

    expect(screen.getByTestId('invite-button')).toHaveClass('offline')
  })

  it('should render with class disabled if status is offline', () => {
    renderComponent('offline')

    expect(screen.getByTestId('invite-button')).toHaveClass('disabled')
  })

  it('should render with class disabled if already invited by user', () => {
    renderComponent('offline', 2)

    expect(screen.getByTestId('invite-button')).toHaveClass('disabled')
  })

  it('should render with class disabled if already invited by friend', () => {
    renderComponent('offline', 2)
    expect(screen.getByTestId('invite-button')).toHaveClass('disabled')
  })
})
