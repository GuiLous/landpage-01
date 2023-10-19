import { configureStore } from '@reduxjs/toolkit'
import { useArgs } from '@storybook/preview-api'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import notificationSlice, {
  Notification,
} from '@/store/slices/notificationSlice'

import { DrawerNotifications } from './DrawerNotifications'

export default {
  title: 'Notifications/DrawerNotifications',
  component: DrawerNotifications,
  argTypes: {
    open: { control: { type: 'boolean' } },
    totalNotifications: { control: 'number' },
  },
  args: {
    open: false,
    totalNotifications: 0,
  },
} as Meta

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  const notifications: Notification[] = Array.from(
    Array(props.totalNotifications)
  ).map((_, index) => {
    return {
      id: index + 1,
      read_date: null,
      avatar:
        'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
      content: 'Teste notificação',
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
      <DrawerNotifications open={false} setOpen={changeOpen} {...props} />
    </Provider>
  )
}
