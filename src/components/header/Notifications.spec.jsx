import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'

import { Notifications } from '@components'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'
import { Provider } from 'react-redux'

describe('Notifications Component', () => {
  const user = {
    id: 1,
  }

  let notifications = [
    {
      id: 1,
      to_user_id: 2,
      content: 'Nova atualização do FiveM disponível.',
      avatar: 'https://github.com/GuiLous.png',
      create_date: '2023-04-08T18:23:12',
      from_user_id: null,
      read_date: null,
    },
    {
      id: 2,
      to_user_id: 2,
      content: 'Uma nova solicitação de amizade para você.',
      avatar: 'https://github.com/GuiLous.png',
      create_date: '2023-04-07T18:23:12',
      from_user_id: 4,
      read_date: '2023-04-07T18:23:12',
    },
    {
      id: 3,
      to_user_id: 2,
      content: 'Uma nova solicitação de amizade para você.',
      avatar: 'https://github.com/GuiLous.png',
      create_date: '2023-04-07T18:23:12',
      from_user_id: 5,
      read_date: null,
    },
  ]

  const store = configureStore({
    reducer: {
      user: UserReducer,
      notifications: NotificationReducer,
    },
    preloadedState: { user, notifications },
  })

  it('should renders correctly', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should not renders badge notification if totalNotifications props equal 0', () => {
    notifications = []

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    )

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
