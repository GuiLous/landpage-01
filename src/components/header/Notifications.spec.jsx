import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'

import { Notifications } from '@components'
import UserReducer from '@slices/UserSlice'
import { Provider } from 'react-redux'

describe('Notifications Component', () => {
  it('should renders correctly', () => {
    const user = {
      id: 1,
      account: {
        notifications: [
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
        ],
      },
    }

    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <Provider store={store}>
        <Notifications totalUnreadNotifications={2} />
      </Provider>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should not renders badge notification if totalNotifications props equal 0', () => {
    const user = {
      id: 1,
      account: {
        notifications: [],
      },
    }

    const store = configureStore({
      reducer: {
        user: UserReducer,
      },
      preloadedState: { user },
    })

    render(
      <Provider store={store}>
        <Notifications totalUnreadNotifications={0} />
      </Provider>
    )

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
