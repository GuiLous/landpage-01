import { configureStore } from '@reduxjs/toolkit'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import notificationSlice, {
  Notification,
} from '@/store/slices/notificationSlice'

import { DrawerNotificationsFooter } from './DrawerNotificationsFooter'

export default {
  title: 'Notifications/DrawerNotificationsFooter',
  component: DrawerNotificationsFooter,
  argTypes: {
    totalNotifications: { control: 'number' },
  },
  args: {
    totalNotifications: 0,
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    const notifications: Notification[] = Array.from(
      Array(props.totalNotifications)
    ).map((_, index) => {
      return {
        id: index + 1,
        read_date: null,
        avatar: '',
        content: '',
        create_date: new Date().toISOString(),
        from_user_id: 1,
        to_user_id: 2,
      }
    })

    const store = configureStore({
      reducer: {
        notifications: notificationSlice,
      },
      preloadedState: {
        notifications,
      },
    })

    return (
      <Provider store={store}>
        <DrawerNotificationsFooter {...props} />
      </Provider>
    )
  },
}
