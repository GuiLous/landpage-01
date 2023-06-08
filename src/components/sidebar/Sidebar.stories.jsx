import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Container, Sidebar } from '@components'
import InviteReducer from '@slices/InviteSlice'
import MatchReducer from '@slices/MatchSlice'
import NotificationReducer from '@slices/NotificationSlice'
import UserReducer from '@slices/UserSlice'

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
  argTypes: {
    unreadInvites: { control: { type: 'range', min: 0 } },
    unreadNotifications: { control: { type: 'range', min: 0 } },
    collapsed: { control: 'boolean' },
    collapsable: { control: 'boolean' },
    userLevel: { control: { type: 'range', min: 0, max: 50 } },
    isInQueue: { control: 'boolean' },
    isInMatch: { control: 'boolean' },
    isRestricted: { control: 'boolean' },
  },
  args: {
    unreadInvites: 0,
    unreadNotifications: 0,
    collapsed: true,
    collapsable: true,
    userLevel: 0,
    isInQueue: false,
    isInMatch: false,
    isRestricted: false,
  },
}

export const Default = {
  render: (props) => {
    const user = {
      id: 1,
      account: {
        level: props.userLevel,
        level_points: 56,
        avatar: {
          medium:
            'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
        },
        username: 'Username',
        lobby: {
          queue: props.isInQueue,
          queue_time: 300,
          restriction_countdown: props.isRestricted ? 300 : null,
        },
      },
    }

    const invites = {
      received: [],
      sent: [],
      unread: props.unreadInvites,
    }

    const match = {
      preMatch: null,
      match: props.isInMatch,
    }

    const notifications = Array.from(
      Array(props.unreadNotifications).keys()
    ).map((friend, index) => ({ id: index }))

    const store = configureStore({
      reducer: {
        user: UserReducer,
        notifications: NotificationReducer,
        invites: InviteReducer,
        match: MatchReducer,
      },
      preloadedState: { user, notifications, invites, match },
    })

    return (
      <BrowserRouter>
        <Provider store={store}>
          <Container style={{ height: '100vh' }} column>
            <Sidebar {...props} />
          </Container>
        </Provider>
      </BrowserRouter>
    )
  },
}
