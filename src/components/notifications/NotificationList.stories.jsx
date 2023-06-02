import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { NotificationList } from '@components'
import NotificationReducer from '@slices/NotificationSlice'

export default {
  title: 'Notifications/NotificationList',
  component: NotificationList,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
}

const mockDataRequests = [
  {
    url: 'http://localhost:8000/api/notifications/1/',
    method: 'PATCH',
    status: 200,
    response: {
      data: { status: 'ok' },
    },
  },
  {
    url: 'http://localhost:8000/api/notifications/2/',
    method: 'PATCH',
    status: 200,
    response: {
      data: { status: 'ok' },
    },
  },
  {
    url: 'http://localhost:8000/api/notifications/3/',
    method: 'PATCH',
    status: 200,
    response: {
      data: { status: 'ok' },
    },
  },
  {
    url: 'http://localhost:8000/api/notifications/read-all/',
    method: 'PATCH',
    status: 200,
    response: {
      data: { status: 'ok' },
    },
  },
]

export const Default = {
  render: (props) => {
    const preloadedState = {
      notifications: [],
    }

    const store = configureStore({
      reducer: { notifications: NotificationReducer },
      devTools: true,
      preloadedState: preloadedState,
    })

    return (
      <Provider store={store}>
        <NotificationList {...props} />
      </Provider>
    )
  },
  args: {
    isOpen: true,
  },
  parameters: {
    mockData: [
      ...mockDataRequests,
      {
        url: 'http://localhost:8000/api/notifications/',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 1,
            content:
              'O seu amigo fulaninhodetal acabou de entrar para a ReloadClub!',
            from_user_id: 5,
            avatar:
              'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
            read_date: '2023-04-15T17:02:30.261Z',
            create_date: '2023-05-15T17:02:30.261Z',
          },
          {
            id: 2,
            content:
              'fulaninhodetal convidou você para fazer parte de um grupo.',
            from_user_id: 5,
            avatar:
              'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
            read_date: null,
            create_date: '2023-05-10T17:02:30.261Z',
          },
          {
            id: 3,
            content:
              'As filas fecharão em breve para atualização. Entre 16/05/2023 20:30 e 16/05/2023 22:00 não será possível procurar partidas.',
            from_user_id: 5,
            avatar:
              'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
            read_date: '2023-04-15T17:02:30.261Z',
            create_date: '2023-04-15T17:02:30.261Z',
          },
        ],
      },
    ],
  },
}

export const Reverse = {
  render: (props) => {
    const preloadedState = {
      notifications: [],
    }

    const store = configureStore({
      reducer: { notifications: NotificationReducer },
      devTools: true,
      preloadedState: preloadedState,
    })

    return (
      <Provider store={store}>
        <NotificationList {...props} />
      </Provider>
    )
  },
  args: {
    isOpen: true,
  },
  parameters: {
    mockData: [
      ...mockDataRequests,
      {
        url: 'http://localhost:8000/api/notifications/',
        method: 'GET',
        status: 200,
        response: [
          {
            id: 1,
            content:
              'O seu amigo fulaninhodetal acabou de entrar para a ReloadClub!',
            from_user_id: 5,
            avatar:
              'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
            read_date: null,
            create_date: '2023-05-15T17:02:30.261Z',
          },
          {
            id: 2,
            content:
              'fulaninhodetal convidou você para fazer parte de um grupo.',
            from_user_id: 5,
            avatar:
              'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
            read_date: '2023-04-15T17:02:30.261Z',
            create_date: '2023-05-10T17:02:30.261Z',
          },
          {
            id: 3,
            content:
              'As filas fecharão em breve para atualização. Entre 16/05/2023 20:30 e 16/05/2023 22:00 não será possível procurar partidas.',
            from_user_id: 5,
            avatar:
              'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
            read_date: null,
            create_date: '2023-04-15T17:02:30.261Z',
          },
        ],
      },
    ],
  },
}

export const Empty = {
  render: (props) => {
    const preloadedState = {
      notifications: [],
    }

    const store = configureStore({
      reducer: { notifications: NotificationReducer },
      devTools: true,
      preloadedState: preloadedState,
    })

    return (
      <Provider store={store}>
        <NotificationList {...props} />
      </Provider>
    )
  },
  args: {
    isOpen: true,
  },
  parameters: {
    mockData: [
      ...mockDataRequests,
      {
        url: 'http://localhost:8000/api/notifications/',
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
}
