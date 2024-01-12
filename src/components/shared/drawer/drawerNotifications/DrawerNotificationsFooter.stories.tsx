import { Meta, StoryObj } from '@storybook/react'

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
    return <DrawerNotificationsFooter {...props} />
  },
}
