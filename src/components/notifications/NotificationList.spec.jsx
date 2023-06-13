import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'

import { NotificationList } from '@components'
import NotificationReducer from '@slices/NotificationSlice'

let mockedNotifications = [
  {
    id: 1,
    content: 'Nova notificação 1',
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    read_date: null,
    create_date: new Date().toISOString(),
  },
]

const server = setupServer(
  rest.get('http://localhost:8000/api/notifications/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedNotifications))
  })
)

describe('NotificationList Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  let notifications = []

  const store = configureStore({
    reducer: {
      notifications: NotificationReducer,
    },
    preloadedState: { notifications },
  })

  it('should renders correctly', () => {
    render(
      <Provider store={store}>
        <NotificationList isOpen />
      </Provider>
    )

    expect(screen.getByText('NOTIFICAÇÕES')).toBeInTheDocument()
    expect(screen.getByText('LER TUDO')).toBeInTheDocument()
  })

  it('should not renders if is not open', () => {
    render(
      <Provider store={store}>
        <NotificationList isOpen={false} />
      </Provider>
    )

    expect(screen.queryByText('NOTIFICAÇÕES')).not.toBeInTheDocument()
    expect(screen.queryByText('LER TUDO')).not.toBeInTheDocument()
  })

  it('should renders notifications with items when has notification', async () => {
    render(
      <Provider store={store}>
        <NotificationList isOpen />
      </Provider>
    )

    await screen.findByText('Nova notificação 1')
    expect(screen.getByText('Nova notificação 1')).toBeInTheDocument()
  })

  it('should not renders notifications when is empty', async () => {
    mockedNotifications = []

    const store = configureStore({
      reducer: {
        notifications: NotificationReducer,
      },
      preloadedState: { notifications },
    })

    render(
      <Provider store={store}>
        <NotificationList isOpen />
      </Provider>
    )

    await screen.findByText('Você não tem notificações.')
    expect(screen.getByText('Você não tem notificações.')).toBeInTheDocument()
  })
})
