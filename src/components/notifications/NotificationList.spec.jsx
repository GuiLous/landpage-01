import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { NotificationList } from '@components'
import NotificationReducer from '@slices/NotificationSlice'

describe('NotificationList Component', () => {
  let notifications = []

  const store = configureStore({
    reducer: {
      notifications: NotificationReducer,
    },
    preloadedState: { notifications },
  })

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <NotificationList isOpen />
      </Provider>
    )

    expect(screen.getByText('NOTIFICAÇÕES')).toBeInTheDocument()
    expect(screen.getByText('LER TUDO')).toBeInTheDocument()
  })

  it('should not render if is not open', () => {
    render(
      <Provider store={store}>
        <NotificationList isOpen={false} />
      </Provider>
    )

    expect(screen.queryByText('NOTIFICAÇÕES')).not.toBeInTheDocument()
    expect(screen.queryByText('LER TUDO')).not.toBeInTheDocument()
  })

  it('should render notifications items when not empty', async () => {
    notifications.push({
      id: 1,
      content: 'Nova notificação 1',
      avatar:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      read_date: null,
      create_date: new Date().toISOString(),
    })

    render(
      <Provider store={store}>
        <NotificationList isOpen />
      </Provider>
    )

    await screen.findByText('Nova notificação 1')
    expect(screen.getByText('Nova notificação 1')).toBeInTheDocument()
  })

  it('should render empty message when empty', async () => {
    notifications = []

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
