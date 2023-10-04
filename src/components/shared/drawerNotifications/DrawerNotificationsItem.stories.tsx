import { Meta, StoryObj } from '@storybook/react'

import { DrawerNotificationsItem } from './DrawerNotificationsItem'

export default {
  title: 'Notifications/DrawerNotificationsItem',
  component: DrawerNotificationsItem,
  argTypes: {
    avatar: { control: 'text' },
    content: { control: 'text' },
    create_date: { control: 'date' },
    isRead: { control: 'boolean' },
  },
  args: {
    avatar:
      'https://avatars.akamai.steamstatic.com/fba2f7ffa02a5501d1fdee81221d87b4504a6159_full.jpg',
    content: 'Teste de notificação',
    create_date: '2023-05-15T17:02:30.261Z',
    isRead: false,
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => <DrawerNotificationsItem {...props} />,
}
