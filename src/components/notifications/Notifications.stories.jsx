import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { Notifications } from '@components'
import NotificationReducer from '@slices/NotificationSlice'

export default {
  title: 'Notifications/Notifications',
  component: Notifications,
}

export const Default = {
  render: (props) => {
    const notifications = [
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
        content:
          'Uma nova solicitação de amizade para você. Verifique suas notificações.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-07T18:23:12',
        from_user_id: 4,
        read_date: null,
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
        notifications: NotificationReducer,
      },
      preloadedState: { notifications },
    })
    return (
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>
    )
  },
}

export const NoBadge = {
  render: (props) => {
    const notifications = [
      {
        id: 1,
        to_user_id: 2,
        content: 'Nova atualização do FiveM disponível.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-08T18:23:12',
        from_user_id: null,
        read_date: '2023-04-08T18:23:12',
      },
      {
        id: 2,
        to_user_id: 2,
        content:
          'Uma nova solicitação de amizade para você. Verifique suas notificações.',
        avatar: 'https://github.com/GuiLous.png',
        create_date: '2023-04-07T18:23:12',
        from_user_id: 4,
        read_date: '2023-04-08T18:23:12',
      },
    ]

    const store = configureStore({
      reducer: {
        notifications: NotificationReducer,
      },
      preloadedState: { notifications },
    })
    return (
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>
    )
  },
}

export const NoNotifications = {
  render: (props) => {
    const notifications = []

    const store = configureStore({
      reducer: {
        notifications: NotificationReducer,
      },
      preloadedState: { notifications },
    })
    return (
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>
    )
  },
}
