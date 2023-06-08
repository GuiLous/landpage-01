import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux'

import { InviteListGroupItem } from '@components'
import AppReducer from '@slices/AppSlice'

const server = setupServer(
  rest.delete(
    'http://localhost:8000/api/lobbies/invites/:invite_id/',
    (req, res, ctx) => {
      return res(ctx.json({}))
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('InviteListGroupItem Component', () => {
  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: {
      app: AppReducer,
    },
    preloadedState: { app },
  })

  const invite = {
    invite_id: '3:1',
    avatar:
      'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
    status: 'online',
    username: 'Username',
  }

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <InviteListGroupItem {...invite} />
      </Provider>
    )
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Disponível')).toBeInTheDocument()
  })
})
