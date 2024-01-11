import { Meta, StoryObj } from '@storybook/react'

import { SidebarMenuItemList } from './SidebarMenuItemList'

const itemsOptions = [
  'amigos',
  'notificações',
  'ranking',
  'loja',
  'suporte',
  'sair',
]

export default {
  title: 'Sidebar/SidebarMenuItemList',
  component: SidebarMenuItemList,
  argTypes: {
    unreadInvites: { control: { type: 'range', min: 0 } },
    unreadNotifications: { control: { type: 'range', min: 0 } },
    amigos: {
      options: itemsOptions,
      control: { type: 'select' },
    },
  },
  args: {
    unreadInvites: 0,
    unreadNotifications: 0,
    item: 'amigos',
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => {
    return <SidebarMenuItemList {...props} />
  },
}
